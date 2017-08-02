// Import environment variables from .env for local testing
require('dotenv').config();

const promisify = require('util').promisify;
const readFile = promisify(require('fs').readFile);
const writeFile = promisify(require('fs').writeFile);
const moment = require('moment');
const Trello = require('../lib/trello.js');

const RESTAURANT_JSON_PATH = './metadata/restaurants.json';

async function readRestaurantJson() {
  let restaurantJson = {};
  try {
    const rawContent = await readFile(RESTAURANT_JSON_PATH);
    restaurantJson = JSON.parse(rawContent.toString());
  } catch (ex) { /* keep it as an empty object */ }

  return restaurantJson;
}

function processBoardJsonIntoRestaurants(boardJson) {
  const customFieldIds = JSON.parse(boardJson.pluginData[0].value).fields.reduce((obj, field) => {
    obj[field.id] = field.n; // eslint-disable-line no-param-reassign
    return obj;
  }, {});
  const metaListId = boardJson.lists.find(list => list.name === 'META').id;

  // Take all the cards,
  const restaurants = boardJson.cards.map(card => ({
    name: card.name,
    idList: card.idList,
    labels: card.labels.map(label => label.color),
    contactInfo: card.pluginData.length ?
      Object.entries(JSON.parse(card.pluginData[0].value).fields).reduce((obj, entry) => {
        obj[customFieldIds[entry[0]]] = entry[1]; // eslint-disable-line no-param-reassign
        return obj;
      }, {}) :
      {},
  })).filter(
    card => card.idList !== metaListId
  ).filter(
    card => !card.labels.includes('black')
  ).map(card => ({
    name: card.name,
    /* eslint-disable dot-notation */
    website: card.contactInfo['Website'],
    phone: card.contactInfo['Phone Number'],
    address: card.contactInfo['Address'],
    /* eslint-enable dot-notation */
    visited: card.labels.includes('green'),
    reviewPending: card.labels.includes('orange'),
    starred: card.labels.includes('yellow'),
  }));

  return restaurants;
}

async function updateRestaurantList(force = false) {
  let update;
  if (force) {
    // If we're forcing an update, always update
    console.warn('Forcing an update...');
    update = true;
  } else {
    // Otherwise, only update if there are new things to get
    console.info('Reading the old file...');
    const currentRestaurantJson = await readRestaurantJson();
    const lastUpdated = currentRestaurantJson.lastUpdated || null;
    const newBoardActions = (await Trello.getBoardActionsSince(lastUpdated)).actions;
    console.info(`${newBoardActions} new actions`);
    update = newBoardActions > 0;
  }

  if (!update) {
    console.warn('Not updating the file');
    return;
  }

  console.info('Going to update the restaurant JSON...');
  const now = moment().toISOString();
  const restaurants = processBoardJsonIntoRestaurants(await Trello.getBoard());
  const restaurantJson = {
    restaurants,
    lastUpdated: now,
  };
  console.info('Writing the JSON file...');
  await writeFile(RESTAURANT_JSON_PATH, JSON.stringify(restaurantJson));
}

// TODO: Maybe make this --force instead?
const force = (process.env.FORCE === 'true');
updateRestaurantList(force);
