import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const NotFoundMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ success: false, message: 'Resource is unavailable' });
};

export default NotFoundMiddleware;
