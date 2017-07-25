const moment = require('moment');
const fetch = require('node-fetch');

const TRELLO_API_BASE_URL = 'https://api.trello.com/1';
const {
  TRELLO_API_KEY,
  TRELLO_TOKEN,
  TRELLO_RESTAURANT_BOARD
} = process.env;

function obj2qstr(obj) {
  return Object.entries(obj).map(([key, val]) => (key + '=' + val)).join('&');
}

async function doTrelloCall(path, qStr) {
  const url = `${TRELLO_API_BASE_URL}${path}?${obj2qstr(qStr)}&key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`;
  const res = await fetch(url);
  return res.json();
}

async function getBoardActionsSince(date) {
  const since = date && moment(date).toISOString();
  const query = {
    fields: ['id', 'name', 'url'].join(','),
    actions: 'all',
    actions_format: 'count',
    actions_since: since,
  };

  return doTrelloCall(`/boards/${TRELLO_RESTAURANT_BOARD}`, query);
}

async function getBoard() {
  const query = {
    fields: ['id', 'name', 'url'].join(','),
    pluginData: true,
    cards: 'open',
    card_fields: ['id', 'name', 'idList', 'labels'].join(','),
    card_pluginData: true,
    labels: 'all',
    label_fields: ['name', 'color'].join(','),
    lists: 'open',
    list_fields: ['name'].join(','),
  };

  return doTrelloCall(`/boards/${TRELLO_RESTAURANT_BOARD}`, query);
}

module.exports = {
  getBoard,
  getBoardActionsSince,
};
