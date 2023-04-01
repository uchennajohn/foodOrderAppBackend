import express,{Request, Response, NextFunction} from "express";
import {plainToClass, plainToInstance} from "class-transformer"
import { CreateCustomerInputs } from "../dto";
import {validate} from "class-validator"
import { GenerateOTP, GeneratePassword, GenerateSalt, Generatesignature, onRequestOTP } from "../utility";
import { Customer } from "../models/CustomerModel";


//  export const CustomerSignup = async(req:Request, res:Response, next:NextFunction)=>{

//     try {

//         const customerInputs = plainToClass(CreateCustomerInputs, req.body)

//         const inputErrors = await validate(customerInputs, {validationError:{target:true}})
         
//         if(inputErrors.length>0){
//             return res.status(400).json(inputErrors);   
//         }
        
//         const {email, phone,password } = customerInputs

//         const salt = await GenerateSalt()
//         const  customerPassword = await GeneratePassword(password, salt)

//         const { otp, expiry } = GenerateOTP();
//         console.log(expiry)

//         const existingCustomer = await Customer.findOne({email:email})

//         if(existingCustomer){
//             return res.status(400).json({message:"Customer already exist"})  
//         }

       

//         const customer = await Customer.create({
//             email:email,
//             phone:phone,
//             password:customerPassword,
//             salt:salt,
//             otp:otp,
//             otp_expiry:expiry,
//             firstName:"",
//             lastName:"",
//             address:"",
//             isVerified:false, 
//             lat:0,
//             lng:0,
//         })


//         if(customer) {

//             //send otp to customer phone number
//             await onRequestOTP(otp, phone)

//             //generate signature
//             const signature = await Generatesignature({
//                  _id: customer._id,
//                 email: customer.email,
//                 isVerified: customer.isVerified
//             })
//            console.log("signature",signature)

//             return res.status(200).json({
//                 signature:signature, 
//                 isVerified:customer.isVerified,
//                 email: customer.email,
//                 otp:otp 
//             })
//         }

//         return res.status(400).json({message:"Customer not created"}) 



//     } catch (error) {
//         res.status(500).json({
//             Error: "Internal server Error",
//             route: "/customer/signup",
//         })
//     }
//  }


export const CustomerSignup = async(req:Request, res:Response, next:NextFunction)=>{

    try {
        
    } catch (error) {
        
    }
}


    export const CustomerLogin = async(req:Request, res:Response, next:NextFunction)=>{

        try {
            
        } catch (error) {
            
        }
    }


    export const CustomerVerify = async(req:Request, res:Response, next:NextFunction)=>{

        try {

            const {otp} = req.body
            const customer = req.user

            if(customer){
                const profile = await Customer.findById(customer._id)

                if(profile){
                    if(String(profile.otp) ===otp && profile.otpExpires >= new Date()){
                    profile.isVerified = true


                    const updatedCustomer = await profile.save()
                     
                    const signature = await Generatesignature({
                        _id: updatedCustomer._id,
                       email: updatedCustomer.email,
                       isVerified: updatedCustomer.isVerified,
                   })

                   return res.status(200).json({
                    message:"Customer verified successfully",
                    signature:signature,
                    isVerified:updatedCustomer.isVerified
                       })
                   }
                }
                
            }
        return res.status(400).json({message:"Error with OTP validatio"})
            
        } catch (error) {
            
        }
    }

    export const RequestOTP = async(req:Request, res:Response, next:NextFunction)=>{

        try {
            
        } catch (error) {
            
        }
    }

    export const GetCustomerProfile = async(req:Request, res:Response, next:NextFunction)=>{

        try {
            
        } catch (error) {
            
        }
    }

    export const EditCustomerProfile = async(req:Request, res:Response, next:NextFunction)=>{

        try {
            
        } catch (error) {
            
        }
    }