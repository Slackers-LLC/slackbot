const client = require('../utils/client.js');

class Query {
  create(alias, endpoint) {
    return client.query(`
        INSERT INTO routes (route_alias, route_endpoint)
        VALUES ($1, $2)
        RETURNING *;
    `,
    [alias, endpoint])
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
