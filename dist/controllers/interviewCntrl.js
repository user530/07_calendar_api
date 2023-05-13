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
const getAllInterviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Get All Interviews Fired');
    res.status(http_status_codes_1.StatusCodes.OK).json([]);
});
exports.getAllInterviews = getAllInterviews;
const getRangeInterviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.query;
    console.log('Get Range Interviews Fired');
    console.log('Query params: ');
    console.log(params);
    res.status(http_status_codes_1.StatusCodes.OK).json([]);
});
exports.getRangeInterviews = getRangeInterviews;
const addInterview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log('Add Interview Fired');
    console.log('Req Body: ');
    console.log(body);
    res.status(http_status_codes_1.StatusCodes.OK).json([]);
});
exports.addInterview = addInterview;
const deleteInterview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    console.log('Delete Interview Fired');
    console.log('Request params: ');
    console.log(params);
    res.status(http_status_codes_1.StatusCodes.OK).json([]);
});
exports.deleteInterview = deleteInterview;
