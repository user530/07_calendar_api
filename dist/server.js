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
require("express-async-errors");
const connect_1 = __importDefault(require("./db/connect"));
const routers_1 = require("./routers");
const middleware_1 = require("./middleware");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Input sanitizers modules
const xss = require('xss-clean');
const sanitizer = require('express-mongo-sanitize');
// Security
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
// Request limiter (500 req/ 15min)
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
// JSON body parser
app.use(express_1.default.json());
// Input sanitizers
app.use(sanitizer());
app.use(xss());
// Routers
app.use('/', routers_1.mainRouter);
app.use('/api/v1/interviews', routers_1.interviewRouter);
// Custom middleware
app.use(middleware_1.NotFoundMiddleware);
app.use(middleware_1.ErrorHandlerMiddleware);
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
