const express = require('express');
const { Slackbot } = require('../utils/slackbot.js');

const slackbot = new Slackbot();

module.exports = express.Router()
  .use(express.urlencoded({ extended:true }))
  .post('/', async(req, res) => {
    let input = req.body.text;

    if(input === 'help') {
      res.json(
        slackbot.message('usage: /create [alias] [endpoint]\nalias: title of your command to hit (/hit $alias)\nendpoint: your api endpoint (only accepts plain/text response) :ghost:')
      );
    } else {
      input = input.split(' '); 
      const alias = input[0];
      const endpoint = input[1];
      const method = input[2];
      
      res.json(await slackbot.create(alias, endpoint, method));
    }
  });
