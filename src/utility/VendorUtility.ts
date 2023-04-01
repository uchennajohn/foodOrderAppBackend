import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../config";
import { VendorPayload } from "../dto"; 
import { Request } from "express";
import { AuthPayload } from "../dto/Auth.dto";

export const vendorSchema = Joi.object().keys({
    email: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
     name: Joi.string().required(),
     ownerName: Joi.string().required(),
     address: Joi.string().required(),
     pincode: Joi.string().required(),
     foodType: Joi.array().required()
    });

export const vendorLoginSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
})

  export const option = {
    abortEarly: false,
    errors: {
      wrap: {
        label: "",
      },
    },
  };

  export const GenerateSalt = async () => {
    return await bcrypt.genSalt();
  };
  
  export const GeneratePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
  };

  export const validatePassword = async( enteredPassword:string,savedPassword:string, salt:string)=>{
    return await GeneratePassword(enteredPassword, salt) === savedPassword
  }
  
  export const Generatesignature = async (payload:AuthPayload) => {
    return jwt.sign(payload,APP_SECRET, { expiresIn: "1d" });
  };
  
  export const verifySignature = async (req:Request) => {
     const signature = req.get("Authorization");
        if (signature) {
            const payload = jwt.verify(signature.split(" ")[1], APP_SECRET) as AuthPayload; 
            
            req.user = payload;
            
            return true;
        }
        return false;
  };