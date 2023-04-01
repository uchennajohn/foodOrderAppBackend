"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditCustomerProfile = exports.GetCustomerProfile = exports.RequestOTP = exports.CustomerVerify = exports.CustomerLogin = exports.CustomerSignup = void 0;
const utility_1 = require("../utility");
const CustomerModel_1 = require("../models/CustomerModel");
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
const CustomerSignup = async (req, res, next) => {
    try {
    }
    catch (error) {
    }
};
exports.CustomerSignup = CustomerSignup;
const CustomerLogin = async (req, res, next) => {
    try {
    }
    catch (error) {
    }
};
exports.CustomerLogin = CustomerLogin;
const CustomerVerify = async (req, res, next) => {
    try {
        const { otp } = req.body;
        const customer = req.user;
        if (customer) {
            const profile = await CustomerModel_1.Customer.findById(customer._id);
            if (profile) {
                if (String(profile.otp) === otp && profile.otpExpires >= new Date()) {
                    profile.isVerified = true;
                    const updatedCustomer = await profile.save();
                    const signature = await (0, utility_1.Generatesignature)({
                        _id: updatedCustomer._id,
                        email: updatedCustomer.email,
                        isVerified: updatedCustomer.isVerified,
                    });
                    return res.status(200).json({
                        message: "Customer verified successfully",
                        signature: signature,
                        isVerified: updatedCustomer.isVerified
                    });
                }
            }
        }
        return res.status(400).json({ message: "Error with OTP validatio" });
    }
    catch (error) {
    }
};
exports.CustomerVerify = CustomerVerify;
const RequestOTP = async (req, res, next) => {
    try {
    }
    catch (error) {
    }
};
exports.RequestOTP = RequestOTP;
const GetCustomerProfile = async (req, res, next) => {
    try {
    }
    catch (error) {
    }
};
exports.GetCustomerProfile = GetCustomerProfile;
const EditCustomerProfile = async (req, res, next) => {
    try {
    }
    catch (error) {
    }
};
exports.EditCustomerProfile = EditCustomerProfile;
