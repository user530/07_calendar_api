class CustomError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export default CustomError;
