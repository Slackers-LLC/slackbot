const { Query } = require('../data/add-route.js');

const sql = new Query();

class Slackbot {
  create(alias, endpoint) {
    return sql.create(alias, endpoint)
      .then(res => 
        res.constraint === 'routes_route_alias_key' ? '*This route already exists!*' : 
          res.code === '23502' ? 'missing argument(s) -- see /create help' : res
      )
      .then(res => this.message(res))
      .catch(err => console.log(err));
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
