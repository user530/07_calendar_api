import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequest, NotFound } from '../errors';
import mongoose from 'mongoose';

const ErrorHandlerMiddleware: ErrorRequestHandler = async (
  err: Error | BadRequest | NotFound | mongoose.Error.ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customErrTemplate = {
    success: false,
    error: {
      code:
        ('statusCode' in err && err.statusCode) ||
        StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message,
    },
  };

  // Mongoose Validation error
  if (err.name === 'ValidationError') {
    customErrTemplate.error.code = StatusCodes.BAD_REQUEST;
    customErrTemplate.error.message = Object.values(
      (err as mongoose.Error.ValidationError).errors
    )
      .map((errObj) => errObj.message)
      .join(' ');
  }

  // Mongoose Cast error
  if (err.name === 'CastError') {
    customErrTemplate.error.code = StatusCodes.BAD_REQUEST;
    customErrTemplate.error.message = 'Wrong identifier format!';
  }

  return res
    .status(customErrTemplate.error.code)
    .json({ ...customErrTemplate });
};

export default ErrorHandlerMiddleware;
