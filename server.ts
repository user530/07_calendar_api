import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db/connect';
import { mainRouter, interviewRouter } from './routers';

dotenv.config();
const app = express();

// Handler async errors
require('express-async-errors');

// Input sanitizer
const sanitizer = require('express-mongo-sanitize');

// JSON body parser
app.use(express.json());
// Sanitizer
app.use(sanitizer());

// === Setup ===

// Routers
app.use('/', mainRouter);
app.use('/api/v1/interviews', interviewRouter);
// Custom middleware

// Declare and invoke start

void (async function start() {
  const port = process.env.PORT || 3000;
  const uri = process.env.MONGO_URI;

  try {
    await connectDB(uri);

    app.listen(port, () => {
      console.log('[Server]: Server is up and running at port ', port);
    });
  } catch (error) {
    console.log('[Server]: Server start failed');
    console.error(error);
    process.exit(1);
  }
})();
