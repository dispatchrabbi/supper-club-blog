const inquirer = require('inquirer');
const moment = require('moment');

const writeFiles = require('../lib/build/write-files.js');
const slugify = require('../lib/slugify.js');

async function askForPostInfo() {
  const answers = {
    restaurant: '',
    date: '',
    title: '',
  };

  const QUESTIONS = [
    {
      type: 'input',
      name: 'restaurant',
      message: 'Restaurant name:',
      default: () => (answers.restaurant || undefined),
    },
    {
      type: 'input',
      name: 'date',
      message: 'Visit date [YYYY-MM-DD]:',
      // only validate if an answer was given
      validate: val => (val ? (moment(val, 'YYYY-MM-DD').isValid() || 'Use YYYY-MM-DD, yo.') : true),
      default: () => (answers.date || undefined),
    },
    {
      type: 'input',
      name: 'title',
      message: 'Post title:',
      default: () => (answers.title || undefined),
    },
    {
      type: 'input',
      name: 'cover',
      message: 'Cover photo URL:',
      default: () => (answers.title || undefined),
    },
  ];

  const CONFIRM = [
    {
      type: 'confirm',
      name: 'looksGood',
      message: 'Look good to you?'
    }
  ];

  let looksGood = false;

  console.log('First, tell me some things about your new post!', '');
  /* eslint-disable no-await-in-loop */
  while (!looksGood) {
    Object.assign(
      answers,
      await inquirer.prompt(QUESTIONS)
    );

    console.log(`
Post title: ${answers.title || '(blank)'}
Restaurant: ${answers.restaurant || '(blank)'}
Date: ${answers.date || '(none given)'}
Cover photo URL: ${answers.cover || '(none given)'}
`);

    looksGood = (await inquirer.prompt(CONFIRM)).looksGood;
  }
  /* eslint-enable no-await-in-loop */

  return answers;
}

async function writeNewPostFile(answers) {
  const contents = `---
layout: post.html
title: ${answers.title}
restaurant: ${answers.restaurant}
date: ${answers.date}
cover: ${answers.cover}
teaser:
draft: true
---
Write your post here!
`;

  const filename = (answers.title ? slugify(answers.title) : 'untitled') + '.md';

  console.log(`Writing your new blank post to ${filename}.`);
  return writeFiles({
    destinationDir: './src/posts/',
    files: { [filename]: contents },
  });
}

async function createNewPost() {
  const answers = await askForPostInfo();
  writeNewPostFile(answers);
}

createNewPost();
