import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import connectDB from './db/connect';
import { mainRouter, interviewRouter } from './routers';
import { NotFoundMiddleware, ErrorHandlerMiddleware } from './middleware';
import cors from 'cors';
import helmet from 'helmet';
import rateLimiter from 'express-rate-limit';

dotenv.config();
const app = express();

// Input sanitizers modules
const xss = require('xss-clean');
const sanitizer = require('express-mongo-sanitize');

// Security
app.use(cors());
app.use(helmet());

// Allow connection from different port
app.set('trust proxy', '127.0.0.1');

// Request limiter (500 req/ 15min)
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// JSON body parser
app.use(express.json());

// Input sanitizers
app.use(sanitizer());
app.use(xss());

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
