const fetch = require('node-fetch');

const TRELLO_API_BASE_URL = 'https://api.trello.com/1';
const {
  TRELLO_API_KEY,
  TRELLO_TOKEN,
  TRELLO_RESTAURANT_BOARD
} = process.env;

const url = TRELLO_API_BASE_URL + `/boards/${TRELLO_RESTAURANT_BOARD}`;
const querystring = Object.entries({
  fields: ['id', 'name', 'url'].join(','),
  pluginData: true,
  cards: 'open',
  card_fields: ['id', 'name', 'idList', 'labels'].join(','),
  card_pluginData: true,
  labels: 'all',
  label_fields: ['name', 'color'].join(','),
  lists: 'open',
  list_fields: ['name'].join(','),
}).map(
  function(el) { return el[0] + '=' + el[1]; }
).join('&');

async function fetchRestaurantsFromTrello() {
  const res = await fetch(`${url}?${querystring}&key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`);
  const boardJson = await res.json();
  return processBoardJsonIntoRestaurants(boardJson);
}

function processBoardJsonIntoRestaurants(boardJson) {
  const customFieldIds = JSON.parse(boardJson.pluginData[0].value).fields.reduce((obj, field) => (obj[field.id] = field.n, obj), {});
  const metaListId = boardJson.lists.find(list => list.name === 'META').id;

  // Take all the cards,
  const restaurants = boardJson.cards.map(card => ({
    name: card.name,
    idList: card.idList,
    labels: card.labels.map(label => label.color),
    contactInfo: card.pluginData.length ?
      Object.entries(JSON.parse(card.pluginData[0].value).fields).reduce((obj, entry) => (obj[customFieldIds[entry[0]]] = entry[1], obj), {}) :
      {},
  })).filter(
    card => card.idList != metaListId
  ).filter(
    card => !card.labels.includes('black')
  ).map(card => ({
    name: card.name,
    website: card.contactInfo['Website'],
    phone: card.contactInfo['Phone Number'],
    address: card.contactInfo['Address'],
    visited: card.labels.includes('green'),
    reviewPending: card.labels.includes('orange'),
    starred: card.labels.includes('yellow'),
  }));

  return restaurants;
};

module.exports = fetchRestaurantsFromTrello;
