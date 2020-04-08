const { Router } = require('express');
const express = require('express');
const client = require('../utils/client.js');
const request = require('superagent');
const cors = require('cors');


module.exports = Router()
  .use(cors())
  .use(express.urlencoded({ extended:true }))
  .post('/', async(req, res, next) => {
    // console.log(req.headers);
    // console.log('============');
    // console.log(req.body);
    let input = req.body.text;
    let result;
    let hitData;

    try {
      result = await client.query(`
                      SELECT route_endpoint FROM routes
                      WHERE route_alias = $1;
                  `,
         
      [input]);

    }
    catch(err) {
      console.log(err);
    }

    try {
      console.log(result);
      hitData = await request.get(result.rows[0].route_endpoint);
      hitData = hitData.text;
    }
    catch(err){
      hitData = err.message;
      console.log(err);
    }
    
    res.json({
      'response_type': 'in_channel',
      'blocks': [
        {
          'type': 'section',
          'text': {
            'type': 'mrkdwn',
            // 'text': 'This is a mrkdwn section block :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>'
            'text': hitData
          }
        }
      ]
    });
  });
