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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const connect_1 = __importDefault(require("./db/connect"));
const routers_1 = require("./routers");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Handler async errors
require('express-async-errors');
// Input sanitizer
const sanitizer = require('express-mongo-sanitize');
// JSON body parser
app.use(express_1.default.json());
// Sanitizer
app.use(sanitizer());
// === Setup ===
// Routers
app.use('/', routers_1.mainRouter);
app.use('/api/v1/interviews', routers_1.interviewRouter);
// Custom middleware
// Declare and invoke start
void (function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const port = process.env.PORT || 3000;
        const uri = process.env.MONGO_URI;
        try {
            yield (0, connect_1.default)(uri);
            app.listen(port, () => {
                console.log('[Server]: Server is up and running at port ', port);
            });
        }
        catch (error) {
            console.log('[Server]: Server start failed');
            console.error(error);
            process.exit(1);
        }
    });
})();
