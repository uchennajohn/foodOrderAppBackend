"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_SECRET = exports.MONGO_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.MONGO_URI = 'mongodb+srv://uchennajohn:mummyjoy@clusteruno.ry7tek5.mongodb.net';
exports.APP_SECRET = process.env.APP_SECRET;
