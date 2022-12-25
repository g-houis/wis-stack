import express, { Response } from 'express';
import { validate } from '../../lib/validator/validate.middleware';
import { ArticleDto, postTestSchema } from './test.validations';
import { ProjectError, WsErrors } from '../../lib/error/error.types';
import { TypedRequest } from '../../lib/request/TypedRequest.type';

const testController = express.Router();

testController.get('/', (req: TypedRequest<undefined>, res: Response) => {
  res.status(204).end();
});

testController.get('/error', () => {
  throw new ProjectError(WsErrors.ERROR);
});

testController.post('/', validate(postTestSchema), (req: TypedRequest<ArticleDto>, res: Response) => {
  res.status(200).send(req.body);
});

export default testController;