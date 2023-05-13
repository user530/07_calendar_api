import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { InterviewModel } from '../models';
import { BadRequest, NotFound } from '../errors';

export const getAllInterviews = async (req: Request, res: Response) => {
  const interviews = await InterviewModel.find(
    {},
    { createdAt: 0, updatedAt: 0, __v: 0 }
  ).sort({
    date: 1,
  });

  res.status(StatusCodes.OK).json({ success: true, data: interviews });
};

export const getRangeInterviews = async (req: Request, res: Response) => {
  const params = req.query;

  if (!params) throw new BadRequest('No request parameters were provided!');

  const { start, end } = params;

  if (!start || !end)
    throw new BadRequest(
      'Please, provide parameters "start" and "end" to specify the range!'
    );

  if (typeof start !== 'string' || typeof end !== 'string')
    throw new BadRequest('Incorrect input format for the range parameters!');

  const rangeInterviews = await InterviewModel.find(
    {
      date: {
        $gte: new Date(parseInt(start)),
        $lte: new Date(parseInt(end)),
      },
    },
    { createdAt: 0, updatedAt: 0, __v: 0 }
  );

  res.status(StatusCodes.OK).json({ success: true, data: rangeInterviews });
};

export const addInterview = async (req: Request, res: Response) => {
  const newInterview = await InterviewModel.create(req.body);

  res.status(StatusCodes.CREATED).json({ success: true, data: newInterview });
};

export const deleteInterview = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) throw new BadRequest('Interview identifier is not found!');

  const deleted = await InterviewModel.findOneAndDelete({ _id: id });

  if (!deleted)
    throw new NotFound(`No interview with identifier ${id} was found!`);

  res.status(StatusCodes.OK).json({ success: true, data: deleted });
};
