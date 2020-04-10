const express = require('express');
const { Slackbot } = require('../utils/slackbot.js');
// const cors = require('cors');

const slackbot = new Slackbot();

module.exports = express.Router()
  // .use(cors())
  .use(express.urlencoded({ extended:true }))
  .post('/', async(req, res) => {

    let input = req.body.text.split(' ');

    const alias = input[0];
    const requestData = input[1];

    res.json(await slackbot.hit(alias, requestData));
  });
