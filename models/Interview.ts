import { Schema, model, InferSchemaType } from 'mongoose';
import { BadRequest } from '../errors';
import { dateIsVacant } from '../utils/validators';

const InterviewSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    interviewee: {
      type: String,
      default: 'someName',
    },
    position: {
      type: String,
      default: 'somePosition',
    },
  },
  { timestamps: true }
);

type Interview = InferSchemaType<typeof InterviewSchema>;

InterviewSchema.pre('save', async function (next): Promise<void> {
  const interviews: Interview[] = await InterviewModel.find({});

  const isVacant = dateIsVacant(interviews, this.date);

  if (!isVacant) throw new BadRequest('Timeslot is already occupied!');

  next();
});

const InterviewModel = model('Interview', InterviewSchema);

export default InterviewModel;
