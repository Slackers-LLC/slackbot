const request = require('superagent');

request.get('https://dog.ceo/api/breeds/image/random')
  .then(res => console.log(res.body.message));
