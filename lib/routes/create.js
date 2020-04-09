const { Router } = require('express');
const express = require('express');
// const client = require('../utils/client.js');
const { Query } = require('../data/add-route.js');
const { Slackbot } = require('../utils/slackbot.js');

module.exports = Router()
  .use(express.urlencoded({ extended:true }))
  .post('/', async(req, res) => {

    let input = req.body.text;

    if(input === 'help') {
      res.json(
        new Slackbot({
          content: 'usage: /create [alias] [endpoint]\nalias: title of your command to hit (/hit $alias)\nendpoint: your api endpoint (only accepts plain/text response) :ghost:'
        })
          .message()
      );
    } else {

      input = input.split(' '); 
      const alias = input[0];
      const endpoint = input[1];
      
      const query = new Query(alias, endpoint);

      query.create()
        .then((createResult) => 
          res.json(
            new Slackbot({
              content: createResult.constraint === 'routes_route_alias_key' ? '*This route already exists!*' : 
                createResult.code === '23502' ? 'missing argument(s) -- see /create help' : createResult
            })
              .message()
          )
        )
        .catch(err => console.log(err));
    }
  });
