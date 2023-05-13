import CustomError from './customError';
import { StatusCodes } from 'http-status-codes';

class BadRequest extends CustomError {
  public statusCode: StatusCodes;

  constructor(msg: string) {
    super(msg);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequest;
