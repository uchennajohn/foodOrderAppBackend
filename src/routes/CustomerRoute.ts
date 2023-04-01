import express, {Request, Response, NextFunction} from "express";
import { CustomerLogin, CustomerSignup, CustomerVerify, EditCustomerProfile, GetCustomerProfile, RequestOTP } from "../controllers";
import { Authenticate } from "../middlewares";


const router = express.Router()


router.post('/signup', CustomerSignup)

router.post('/login', CustomerLogin)

router.use(Authenticate)

router.patch('/verify', CustomerVerify)

router.get('/otp',RequestOTP)

router.get('/profile', GetCustomerProfile) 

router.patch('/profile', EditCustomerProfile)

export {router as CustomerRoute}