import CustomError from './customError';
import { StatusCodes } from 'http-status-codes';

class NotFound extends CustomError {
  public statusCode: StatusCodes;

  constructor(msg: string) {
    super(msg);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFound;
