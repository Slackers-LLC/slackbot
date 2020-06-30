const express = require('express');
const request = require('superagent');
const { Slackbot } = require('../utils/slackbot.js');

const slackbot = new Slackbot();

const getSpot = async() => {
  const inspAPI = await request.get('https://inspirobot.me/api?generate=true');
  // console.log(spotAPI, 'heres the data');
  return JSON.parse(inspAPI.text);
};


module.exports = express.Router()
  .post('/', async(req, res, next) => {
    const myInsp = await getSpot();
    
    res.json(slackbot.image(myInsp, 'Inspire Image'));
  });
