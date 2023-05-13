import express, { Request, Response } from 'express';
import path from 'path';

const router = express.Router();

router.get('/', (req: Request, res: Response) =>
  res.sendFile(path.resolve('index.html'))
);

export default router;
