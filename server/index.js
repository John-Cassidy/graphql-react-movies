import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import schema from './schema/schema.js';

process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(err.name, err.message, err.stack);
  } else {
    // eslint-disable-next-line no-console
    console.log(err.name, err.message);
  }

  process.exit(1);
});

// SETUP EXPRESS
const app = express();
app.use(cors());

// SETUP ENVIRONMENT CONFIGURATION
dotenv.config({ path: './.env' });

let DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
).replace('<USER>', process.env.DATABASE_USER);

if (process.env.NODE_ENV === 'development') {
  DB = process.env.DATABASE_LOCAL;
}

// SETUP MONGOOSE DB CONFIGURATION

// SETUP GRAPHQL CONFIGURATION
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// START SERVER
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}`);
});

// HANDLE UNHANDLED REJECTIONS
process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line no-console
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
