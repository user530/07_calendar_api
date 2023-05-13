import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getAllInterviews = async (req: Request, res: Response) => {
  console.log('Get All Interviews Fired');

  res.status(StatusCodes.OK).json([]);
};
export const getRangeInterviews = async (req: Request, res: Response) => {
  const params = req.query;
  console.log('Get Range Interviews Fired');
  console.log('Query params: ');
  console.log(params);

  res.status(StatusCodes.OK).json([]);
};
export const addInterview = async (req: Request, res: Response) => {
  const body = req.body;
  console.log('Add Interview Fired');
  console.log('Req Body: ');
  console.log(body);

  res.status(StatusCodes.OK).json([]);
};
export const deleteInterview = async (req: Request, res: Response) => {
  const params = req.params;
  console.log('Delete Interview Fired');
  console.log('Request params: ');
  console.log(params);

  res.status(StatusCodes.OK).json([]);
};
