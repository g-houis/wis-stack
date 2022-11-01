import express, { Request, Response } from 'express';

const testController = express.Router();

testController.get('/', (req: Request, res: Response) => {
  res.status(204).end();
});

export default testController;