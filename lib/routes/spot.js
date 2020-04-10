const express = require('express');
const request = require('superagent');
const { Slackbot } = require('../utils/slackbot.js');

const slackbot = new Slackbot();

const getSpot = async() => {
  const spotAPI = await request.get('https://dog.ceo/api/breeds/image/random');
  console.log(spotAPI, 'heres the data');
  return JSON.parse(spotAPI.text).message;
};


module.exports = express.Router()
  .post('/', async(req, res, next) => {

    const mySpot = await getSpot();
    
    res.json(slackbot.image(mySpot, 'Dog Image'));
  });
