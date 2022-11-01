import express, { Request, Response } from 'express';
import { validate } from '../../lib/validator/validate.middleware';
import { postTestSchema } from './test.validations';
import { ProjectError, WsErrors } from '../../lib/error/error.types';

const testController = express.Router();

testController.get('/', (req: Request, res: Response) => {
  res.status(204).end();
});

testController.get('/error', (req: Request, res: Response) => {
  throw new ProjectError(WsErrors.ERROR);
});

testController.post('/', validate(postTestSchema), (req: Request, res: Response) => {
  res.status(200).send(req.body);
});

export default testController;