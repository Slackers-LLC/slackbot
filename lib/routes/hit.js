const express = require('express');
const { Slackbot } = require('../utils/slackbot.js');
// const cors = require('cors');

const slackbot = new Slackbot();

module.exports = express.Router()
  // .use(cors())
  .use(express.urlencoded({ extended:true }))
  .post('/', (req, res, next) => {
    const { text: input } = req.body;
    slackbot.hit(input)
      .then(message => res.send(message))
      .catch(next)
  });
