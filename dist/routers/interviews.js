"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const interviewCntrl_1 = require("../controllers/interviewCntrl");
router.route('/').get(interviewCntrl_1.getAllInterviews).post(interviewCntrl_1.addInterview);
router.route('/range').get(interviewCntrl_1.getRangeInterviews);
router.route('/:id').delete(interviewCntrl_1.deleteInterview);
exports.default = router;
