"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const InterviewSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)('Interview', InterviewSchema);
