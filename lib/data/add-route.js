const client = require('../utils/client.js');

class Query {
  create(alias, endpoint, json_location = null, method = 'GET') {
    return client.query(`
        INSERT INTO routes (route_alias, route_endpoint, content_type, json_location, method)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `,
    [alias, endpoint, null, json_location, method])
      .then(res => res.rows[0]);
  }
  select(alias) {
    return client.query(`
      SELECT route_endpoint, method, json_location FROM routes
      WHERE route_alias = $1;
    `,
    [alias])
      .then(res => res.rows[0]);
  }
}

module.exports = {
  Query
};
