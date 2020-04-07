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
  
       
      
  
      console.log('seed data load complete');
    }
    catch(err) {
      console.log(err);
    }
    finally {
      client.end();
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
