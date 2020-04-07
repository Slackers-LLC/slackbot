const client = require('../utils/client.js');
// import our seed data:
const instruments = require('../seed-routes.js');

run();

async function run() {

  try {

    // // "Promise all" does a parallel execution of async tasks
    // await Promise.all(
    //   // for every cat data, we want a promise to insert into the db
    //   instruments.map(instrument => {


    //     const type = instrumentTypes.find(type => {
    //       return type.name === instrument.type;
    //     });

    //     // This is the query to insert a cat into the db.
    //     // First argument is the function is the "parameterized query"
    //     return client.query(`
    //                 INSERT INTO instruments (instrument, type_id, main_strings, bowed, origin, url)
    //                 VALUES ($1, $2, $3, $4, $5, $6);
    //             `,
    //     // Second argument is an array of values for each parameter in the query:
    //     [instrument.instrument, type.id, instrument.main_strings, instrument.bowed, instrument.origin, instrument.url]);

    //   })
    // );


    // console.log('seed data load complete');
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }

}
