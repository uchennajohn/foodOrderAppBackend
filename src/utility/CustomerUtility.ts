import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../config";
import { VendorPayload } from "../dto"; 
import { Request } from "express";
import { AuthPayload } from "../dto/Auth.dto";

export const customerSchema = Joi.object().keys({
    email: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    name: Joi.string().required(),
})
    

export const customerLoginSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
})

export const GenerateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const expiry = new Date();
  
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
    return { otp, expiry };
  };
  
  export const onRequestOTP = async (otp: number, toPhoneNumber: string) => {
    
    const accountSid = "AC754a5512108b8643b56dcc221a4e1230"
    const authToken = "9582d02bd9e18830b8677fee996d4cd0"
    const fromAdminPhone = "+15073669233"
    const client = require("twilio")(accountSid, authToken);
    //const toPhoneNumber = `+91${toPhoneNumber}`

    const response = await client.messages.create({
          body: `Your OTP is ${otp}`,
          to: `+234${toPhoneNumber}`,
          from: fromAdminPhone,
        });
        return response;

  };