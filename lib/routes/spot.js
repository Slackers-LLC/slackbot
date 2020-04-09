
const express = require('express');
const request = require('superagent');


const getSpot = async() => {
  const spotAPI = await request.get('https://dog.ceo/api/breeds/image/random');
  console.log(spotAPI, 'heres the data');
  return JSON.parse(spotAPI.text).message;
};


module.exports = express.Router()
  .post('/', async(req, res, next) => {

    const mySpot = await getSpot();
    
    res.json({
      'response_type': 'in_channel',
      'blocks': [
        {
          'type': 'image',
          'title': {
            'type': 'plain_text',
            'text': 'Dog image',
            'emoji': true
          },
          'image_url': mySpot,
          'alt_text': 'Dog image'
        }  
      ]
    });
  });
