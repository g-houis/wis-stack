import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import ConfigService from './services/config/config.service';
import testController from './controllers/test/test.controller';
import { notFoundErrorHandler } from './lib/error/error.middleware';

const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// controllers
app.use('/test', testController);

// errors
app.use('*', notFoundErrorHandler);

app.listen(ConfigService.getExpressPort(), () => {
  console.log(`server is up on port ${ConfigService.getExpressPort()} with env ${process.env.NODE_ENV}`);
});