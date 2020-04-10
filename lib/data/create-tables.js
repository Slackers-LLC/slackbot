const client = require('../utils/client.js');

run();

async function run() {
  // make a new pg client to the supplied url
  try {
    // run a query to create tables
    await client.query(`
            CREATE TABLE routes (
                id SERIAL PRIMARY KEY NOT NULL,
                route_alias VARCHAR(256) NOT NULL UNIQUE,
                route_endpoint VARCHAR(256) NOT NULL,
                content_type VARCHAR(256),
                json_location VARCHAR(256)
            );
        `);

    console.log('create tables complete');
  }
  catch(err) {
    // problem? let's see the error...
    console.log(err);
  }
  finally {
    // success or failure, need to close the db connection
    client.end();
  }
    
}
