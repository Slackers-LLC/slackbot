class Slackbot {
  constructor({ content } = {}) {
    this.content = content;
  }
  message() {
    return ({
      'response_type': 'ephemeral',
      'blocks': [
        {
          'type': 'section',
          'text': {
            'type': 'mrkdwn',
            // 'text': 'This is a mrkdwn section block :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>'
            'text': this.content
          }
        }
      ]
    });
  }
  // error() {
  //   return ({
  //     'response_type': 'ephemeral',
  //     'blocks': [
  //       {
  //         'type': 'section',
  //         'text': {
  //           'type': 'mrkdwn',
  //           // 'text': 'This is a mrkdwn section block :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>'
  //           'text': '*' + this.content + '*'
  //         }
  //       }
  //     ]
  //   });
  // }
}

module.exports = {
  Slackbot
};
