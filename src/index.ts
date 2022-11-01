import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import ConfigService from './services/config/config.service';

const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(ConfigService.getExpressPort(), () => {
  console.log(`server is up on port ${ConfigService.getExpressPort()} with env ${process.env.NODE_ENV}`);
})