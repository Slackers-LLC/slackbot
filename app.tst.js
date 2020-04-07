const request = require('supertest');
const app = require('../lib/app');
// const connect = require('../lib/utils/connect');
const client = require('../lib/utils/client.js');
// const mongoose = require('mongoose');

describe('app routes', () => {
  beforeAll(() => {
    // connect();
  });

  beforeEach(() => {
    // return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    // return mongoose.connection.close();
  });
});
