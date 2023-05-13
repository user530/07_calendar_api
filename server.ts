import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import connectDB from './db/connect';
import { mainRouter, interviewRouter } from './routers';
import { NotFoundMiddleware, ErrorHandlerMiddleware } from './middleware';

dotenv.config();
const app = express();

// Input sanitizer
const sanitizer = require('express-mongo-sanitize');

// JSON body parser
app.use(express.json());
// Sanitizer
app.use(sanitizer());

// Routers
app.use('/', mainRouter);
app.use('/api/v1/interviews', interviewRouter);

// Custom middleware
app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

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
