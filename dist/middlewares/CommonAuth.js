"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
const utility_1 = require("../utility");
const Authenticate = async (req, res, next) => {
    const validate = await (0, utility_1.verifySignature)(req);
    if (validate) {
        return next();
    }
    else {
        return res.json({ "message": " User Unauthorized" });
    }
};
exports.Authenticate = Authenticate;
