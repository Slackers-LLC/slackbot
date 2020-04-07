const client = require('../utils/client.js');
// import our seed data:
const routes = require('./seed-routes.js');

run();

async function run() {

  try {

    // "Promise all" does a parallel execution of async tasks
    await Promise.all(
      // for every cat data, we want a promise to insert into the db
      routes.map(route => {

        // This is the query to insert a cat into the db.
        // First argument is the function is the "parameterized query"
        return client.query(`
                    INSERT INTO routes (route_alias, route_endpoint)
                    VALUES ($1, $2);
                `,
        // Second argument is an array of values for each parameter in the query:
        [route.route_alias, route.route_endpoint]);

      })
    );

    console.log('seed data load complete');
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }

}
