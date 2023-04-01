import {Request, Response, NextFunction} from 'express';
import { CreateVendorInputs } from '../dto';
import {vendorSchema, option, GenerateSalt, GeneratePassword} from '../utility'
import uuidV4 from 'uuid'
import { Vendor } from '../models';


 export const CreateVendor = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const {name, address, email,foodType, ownerName, phone, password, pincode } = <CreateVendorInputs>req.body

        const validateResult = vendorSchema.validate(req.body, option);
        if (validateResult.error) {
            return res.status(400).json({
              Error: validateResult.error.details[0].message,
            });
          }

        const existingVendor = await Vendor.findOne({email:email})

        if(existingVendor){
            return res.json({"message":"Vendor already exists"})
        }

        const uuidVendor = uuidV4
       
          
          //generate Salt
          const salt = await GenerateSalt(); 
          //hash the password 
          const vendorPassword = await GeneratePassword(password, salt);

        const createVendor = await Vendor.create({
            _id: uuidVendor,
            name: name,
            email: email,
            password: vendorPassword,
            phone: phone,
            address: address,
            ownerName: ownerName,
            foodType: foodType,
            pincode: pincode,
            salt: salt,
            serviceAvailable: false,
            rating: 0,
            coverImage: [], 
            foods:[]
        })

        res.json(createVendor)
        
    } catch (error) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/admins/createvendors",
        })
    }
}

export const GetVendors = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const vendors = await Vendor.find()

        if(!vendors){
            return res.json({"message":"No vendors found"})
        }
        
        return res.json(vendors)
    } catch (error) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/admins/getvendors",
        })
    }
}

export const GetVendorById = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const vendorId = req.params.id

        const vendor = await Vendor.findById(vendorId)
        
        if(!vendor){
            return res.json({"message":"No vendor found"})
        }

        return res.json(vendor) 

    } catch (error) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/admins/getvendor/:id",
        })
    }
}