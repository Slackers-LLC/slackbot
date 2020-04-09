const client = require('../utils/client.js');

class Query {
  constructor(alias, endpoint) {
    this.alias = alias;
    this.endpoint = endpoint;
  }
  create() {
    return client.query(`
        INSERT INTO routes (route_alias, route_endpoint)
        VALUES ($1, $2)
        RETURNING *;
    `,
    [this.alias, this.endpoint])
      .then(res => res.rows[0])
      .catch(err => {
        console.log(err);
        return err;
      });
  }
}

module.exports = {
  Query
};
