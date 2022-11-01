import express, { Request, Response } from 'express';
import { validate } from '../../lib/validator/validate.middleware';
import { postTestSchema } from './test.validations';

const testController = express.Router();

testController.get('/', (req: Request, res: Response) => {
  res.status(204).end();
});

testController.post('/', validate(postTestSchema), (req: Request, res: Response) => {
  res.status(200).send(req.body);
});

export default testController;