"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySignature = exports.Generatesignature = exports.validatePassword = exports.GeneratePassword = exports.GenerateSalt = exports.option = exports.vendorLoginSchema = exports.vendorSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
exports.vendorSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    password: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    name: joi_1.default.string().required(),
    ownerName: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    pincode: joi_1.default.string().required(),
    foodType: joi_1.default.array().required()
});
exports.vendorLoginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
exports.option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
const GenerateSalt = async () => {
    return await bcrypt_1.default.genSalt();
};
exports.GenerateSalt = GenerateSalt;
const GeneratePassword = async (password, salt) => {
    return await bcrypt_1.default.hash(password, salt);
};
exports.GeneratePassword = GeneratePassword;
const validatePassword = async (enteredPassword, savedPassword, salt) => {
    return await (0, exports.GeneratePassword)(enteredPassword, salt) === savedPassword;
};
exports.validatePassword = validatePassword;
const Generatesignature = async (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.APP_SECRET, { expiresIn: "1d" });
};
exports.Generatesignature = Generatesignature;
const verifySignature = async (req) => {
    const signature = req.get("Authorization");
    if (signature) {
        const payload = jsonwebtoken_1.default.verify(signature.split(" ")[1], config_1.APP_SECRET);
        req.user = payload;
        return true;
    }
    return false;
};
exports.verifySignature = verifySignature;
