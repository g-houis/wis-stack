import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import ConfigService from './services/config/config.service';
import carController from './controllers/car/car.controller';
import { errorHandler, notFoundErrorHandler } from './lib/error/error.middleware';
import logger from './lib/logger/logger';

const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// controllers
app.use('/cars', carController);

// errors
app.use('*', notFoundErrorHandler);
app.use(errorHandler);

app.listen(ConfigService.getExpressPort(), () => {
  logger.info(`server is up on port ${ConfigService.getExpressPort()} with env ${process.env.NODE_ENV}`);
});