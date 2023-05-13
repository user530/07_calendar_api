import express from 'express';

const router = express.Router();

import {
  getAllInterviews,
  getRangeInterviews,
  addInterview,
  deleteInterview,
} from '../controllers/interviewCntrl';

router.route('/').get(getAllInterviews).post(addInterview);
router.route('/range').get(getRangeInterviews);
router.route('/:id').delete(deleteInterview);

export default router;
