const express = require('express');
const { Slackbot } = require('../utils/Slackbot.js');

const slackbot = new Slackbot();

module.exports = express.Router()
  .use(express.urlencoded({ extended:true }))
  .post('/', async(req, res, next) => {
    // use destructuring is a bit more idiomatic 
    const { text: input } = req.body;
    slackbot.create(input)
      .then(message => res.send(message))
      .catch(next);
  });
