const client = require('../utils/client.js');

class Query {
  create(alias, endpoint) {
    return client.query(`
        INSERT INTO routes (route_alias, route_endpoint, content_type, json_location)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `,
    [alias, endpoint, null, null])
      .then(res => res.rows[0])
      .catch(err => {
        console.log(err);
        return err;
      });
  }
  select(alias) {
    return client.query(`
      SELECT route_endpoint FROM routes
      WHERE route_alias = $1;
    `,
    [alias])
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
