import dotenv from 'dotenv'
import express, { Response, Request, NextFunction } from 'express';

dotenv.config()
const app = require('express')();

function main() {
  app.use(express.static(require('path').join(__dirname, 'public')));

  app.use(
    require('morgan')('dev'), // logger
    express.json(),
    express.urlencoded({extended: false}),
    require('cookie-parser')(),
    require('cors')(),
  );

  app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    // pre-api error handler
    console.log('Error before api declaring: ', err.message)
  })

  require('./routes')(app);

  app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    // api error handler
    console.log('Error in response', err)
    response.status(500).json(err.message || err)
  })

  console.log('Server runned at port 8000');
}


main();

module.exports = app
