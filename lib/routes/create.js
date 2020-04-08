const { Router } = require('express');
const express = require('express');
const client = require('../utils/client.js');


module.exports = Router()
  .use(express.urlencoded({ extended:true }))
  .post('/', async(req, res, next) => {
    // console.log(req.headers);
    // console.log('============');
    // console.log(req.body);
    let input = req.body.text;

    if(input === 'help') {
      res.json({
        'response_type': 'ephemeral',
        'blocks': [
          {
            'type': 'section',
            'text': {
              'type': 'mrkdwn',
              // 'text': 'This is a mrkdwn section block :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>'
              'text': 'usage: /create [alias] [endpoint]\nalias: title of your command to hit (/hit $alias)\nendpoint: your api endpoint (only accepts plain/text response)'
            }
          }
        ]
      });
    } else {

      input = input.split(' '); 
      const alias = input[0];
      const endpoint = input[1];
      let result;

      try {
        result = await client.query(`
                      INSERT INTO routes (route_alias, route_endpoint)
                      VALUES ($1, $2)
                      RETURNING *;
                  `,
         
        [alias, endpoint]);
  
      }
      catch(err) {
        console.log(err);
      }

    }









    res.json({
      'response_type': 'in_channel',
      'blocks': [
        {
          'type': 'section',
          'text': {
            'type': 'mrkdwn',
            // 'text': 'This is a mrkdwn section block :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>'
            'text': result.rows[0]
          }
        }
      ]
    });
  });
