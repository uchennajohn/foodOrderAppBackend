import express,{Request, Response, NextFunction } from "express"
import { AuthPayload } from "../dto/Auth.dto";
import { verifySignature } from "../utility";

 declare global{
    namespace Express {
        interface Request {
            user?: AuthPayload
        }
    }
 }

 export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const validate = await verifySignature(req)

    if(validate){
     return next()
 }else{
    return res.json({"message":" User Unauthorized"})
 }
} 
