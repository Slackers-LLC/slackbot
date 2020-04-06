const { Router } = require('express');
const express = require('express');

module.exports = Router()
  .use(express.urlencoded({ extended:true }))
  .post('/', async(req, res, next) => {
    console.log(req.headers);
    console.log('============');
    console.log(req.body);
    res.json({
      'response_type': 'in_channel',
      'blocks': [
        {
          'type': 'section',
          'text': {
            'type': 'mrkdwn',
            // 'text': 'This is a mrkdwn section block :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>'
            'text': 'It worked!'
          }
        }
      ]
    });
  });