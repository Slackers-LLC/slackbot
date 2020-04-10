const client = require('../utils/client.js');

run();

async function run() {

  try {

    await client.query(`
            DROP TABLE IF EXISTS routes;
        `);

    console.log('drop tables complete');
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}
