const { Query } = require('../data/add-route.js');
const request = require('superagent');

const sql = new Query();

class Slackbot {
  create(input) {
    if(input === 'help') {
      return Promise.resolve(this.message('usage: /create [alias] [endpoint] [method:optional default=GET]\nalias: title of your command to hit (/hit $alias)\nendpoint: your api endpoint (only accepts plain/text response) :ghost:\nmethod: optional, default is GET, can be GET or POST'))
    };

    const [alias, endpoint, method, json_location] = input.split(' '); 
    return sql.create(alias, endpoint, method, json_location)
      .then(res => 
        res.constraint === 'routes_route_alias_key' ? '*This route already exists!*' : 
          res.code === '23502' ? 'missing argument(s) -- see /create help' : res
      )
      .then(res => this.message(JSON.stringify(res)))
      .catch(err => console.log(err));
  }

  async hit(input) {
    const [alias, requestData] = input.split(' ');
    const { method, route_endpoint, json_location } =sql.select(alias);
    // use superagent to make either a get or post request
    const res = await request[method.toLowerCase()](route_endpoint);
    if(!json_location && !requestData) return this.message(res.text);

    // /hit time json_key -> use json_key as the key
    // /hit time  -> use json_location
    // read the response as json and get the text at json_location
    return this.message(res.body[requestData || json_location]);
  }

  message(content) {
    return ({
      'response_type': 'ephemeral',
      'blocks': [
        {
          'type': 'section',
          'text': {
            'type': 'mrkdwn',
            // 'text': 'This is a mrkdwn section block :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>'
            'text': content
          }
        }
      ]
    });
  }

  image(content, title) {
    return ({
      'response_type': 'ephemeral',
      'blocks': [
        {
          'type': 'image',
          'title': {
            'type': 'plain_text',
            'text': title,
            'emoji': true
          },
          'image_url': content,
          'alt_text': title
          
        }
      ]
    });
  }
  //MAYBE HAVE ERROR METHOD FOR SPECIFIC FORMATTING
}

module.exports = {
  Slackbot
};
