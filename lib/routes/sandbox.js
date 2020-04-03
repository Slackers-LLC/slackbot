const { Router } = require('express');
const express = require('express');

module.exports = Router()
  .use(express.urlencoded({extended:true}))
  .post('/', async(req, res, next) => {
    console.log(req.body);
  });
