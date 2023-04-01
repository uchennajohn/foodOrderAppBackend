"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onRequestOTP = exports.GenerateOTP = exports.customerLoginSchema = exports.customerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.customerSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    password: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    name: joi_1.default.string().required(),
});
exports.customerLoginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
const GenerateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const expiry = new Date();
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
    return { otp, expiry };
};
exports.GenerateOTP = GenerateOTP;
const onRequestOTP = async (otp, toPhoneNumber) => {
    const accountSid = "AC754a5512108b8643b56dcc221a4e1230";
    const authToken = "9582d02bd9e18830b8677fee996d4cd0";
    const fromAdminPhone = "+15073669233";
    const client = require("twilio")(accountSid, authToken);
    //const toPhoneNumber = `+91${toPhoneNumber}`
    const response = await client.messages.create({
        body: `Your OTP is ${otp}`,
        to: `+234${toPhoneNumber}`,
        from: fromAdminPhone,
    });
    return response;
};
exports.onRequestOTP = onRequestOTP;
