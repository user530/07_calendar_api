import { Schema, model, Types } from 'mongoose';

interface IInterview {
  id: number;
  date: Date;
  position: string;
  interviewee: string;
}

const InterviewSchema = new Schema<IInterview>({
  id: {
    type: Number,
    required: true,
  },
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
});

export default model('Interview', InterviewSchema);
