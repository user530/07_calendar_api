"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInterview = exports.addInterview = exports.getRangeInterviews = exports.getAllInterviews = void 0;
const http_status_codes_1 = require("http-status-codes");
const models_1 = require("../models");
const errors_1 = require("../errors");
const getAllInterviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const interviews = yield models_1.InterviewModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }).sort({
        date: 1,
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: interviews });
});
exports.getAllInterviews = getAllInterviews;
const getRangeInterviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.query;
    if (!params)
        throw new errors_1.BadRequest('No request parameters were provided!');
    const { start, end } = params;
    if (!start || !end)
        throw new errors_1.BadRequest('Please, provide parameters "start" and "end" to specify the range!');
    if (typeof start !== 'string' ||
        typeof end !== 'string' ||
        !new Date(start) ||
        !new Date(end))
        throw new errors_1.BadRequest('Incorrect input format for the range parameters!');
    const rangeInterviews = yield models_1.InterviewModel.find({
        date: {
            $gte: new Date(start),
            $lte: new Date(end),
        },
    }, { createdAt: 0, updatedAt: 0, __v: 0 });
    res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: rangeInterviews });
});
exports.getRangeInterviews = getRangeInterviews;
const addInterview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newInterview = yield models_1.InterviewModel.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, data: newInterview });
});
exports.addInterview = addInterview;
const deleteInterview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        throw new errors_1.BadRequest('Interview identifier is not found!');
    const deleted = yield models_1.InterviewModel.findOneAndDelete({ _id: id });
    if (!deleted)
        throw new errors_1.NotFound(`No interview with identifier ${id} was found!`);
    res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: deleted });
});
exports.deleteInterview = deleteInterview;
