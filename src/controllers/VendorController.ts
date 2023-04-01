import { Request, Response, NextFunction} from "express"
import { EditVendorInputs, VendorLoginInputs } from "../dto"
import { CreateFoodInputs } from "../dto/Food.dto"
import { Food, Vendor } from "../models"
import {vendorLoginSchema, option, validatePassword, Generatesignature} from "../utility"

 
export const VendorLogin = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const {email, password} = <VendorLoginInputs>req.body

        const validateResult = vendorLoginSchema.validate(req.body, option);
        if (validateResult.error) {
            return res.status(400).json({
              Error: validateResult.error.details[0].message,
            });
          }

        const existingVendor = await Vendor.findOne({email:email})

        if(existingVendor){
           
            const validation = await validatePassword(password, existingVendor.password, existingVendor.salt)

            if(validation){
          
             const signature = await Generatesignature({
                    _id: existingVendor._id,
                    email: existingVendor.email,
                    name: existingVendor.name
           })
           return res.status(200).json({
            message: "You have successfully logged in",
            signature,
        });
            }else{
                 return res.json({"message":"Login  Credentials not valid"})
            }
        }
        return res.json({"message":"Vendor not found"})
    } catch (error) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/vendor/login",
        }) 
    }
       
} 
    



export const GetVendorProfile =async (req:Request, res:Response, next:NextFunction) => {
 
    try {
        const user = req.user
        if(user){
            const existingVendor = await Vendor.findById({_id:user._id}) 
            res.json(existingVendor)
        }

        return res.json({"message":"Vendor information not found"})


    } catch (error) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/vendor/profile",
        }) 
    }
}


export const UpdateVendorProfile = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const { foodTypes, name, phone, address} = <EditVendorInputs> req.body;
        const user = req.user
        if(user){
            const existingVendor = await Vendor.findById({_id:user._id}) 

            if(existingVendor){
                existingVendor.name = name
                existingVendor.foodType = foodTypes
                existingVendor.phone = phone
                existingVendor.address = address


               const updateVendor = await existingVendor.save()
               return res.json(updateVendor)
            }
            res.json(existingVendor)
        }

        return res.json({"message":"Vendor information not found"})
        
    } catch (error) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/vendor/profile",
        }) 
    }
}

export const UpdateVendorCoverImage = async (req: Request, res: Response, next: NextFunction)=>{
    try {

        const user = req.user
        if(user){
          
            const vendor = await Vendor.findById({_id:user._id})

            if(vendor){

                const files = req.files as [Express.Multer.File]  

                const images = files.map((file: Express.Multer.File)=>file.filename )

                vendor.coverImage.push(...images)

              
                const result = await vendor.save()

                return res.json(result); 
            }

        }

        return res.json({"message":"Something went wrong with add food"})

        
          
    } catch (error) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/vendor/profile",
        }) 
    }
}

export const UpdateVendorService = async (req: Request, res: Response, next: NextFunction)=>{
    try {

        const { foodTypes, name, phone, address} = <EditVendorInputs> req.body;
        const user = req.user
        if(user){
            const existingVendor = await Vendor.findById({_id:user._id}) 

            if(existingVendor){
               existingVendor.serviceAvailable = !existingVendor.serviceAvailable;

                const updateVendor = await existingVendor.save()
                return res.json(updateVendor)
            }
            res.json(existingVendor)
        }

        return res.json({"message":"Vendor information not found"})
         
    } catch (error) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/vendor/service",
        }) 
    }
}


export const AddFood =async(req:Request, res:Response, next:NextFunction)=>{

    try {

       

        const user = req.user
        if(user){
            const {name, description, readyTime, foodType, price, category} = <CreateFoodInputs>req.body

            const vendor = await Vendor.findById({_id:user._id})

            if(vendor){

                const files = req.files as [Express.Multer.File]  

                const images = files.map((file: Express.Multer.File)=>file.filename )

                const createdFood = await Food.create({
                     vendorId: vendor._id,
                     name:name,
                     description: description,
                     foodType: foodType,
                     images: images,
                     price: price,
                     category: category,
                     readyTime: readyTime,
                     rating: 0
                })

                vendor.foods.push(createdFood)
                const result = await vendor.save()

                return res.json(result); 
            }

        }

        return res.json({"message":"Something went wrong with add food"})

        
    } catch (error) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/vendor/food",
        }) 
    }
}

export const GetFoods = async (req:Request, res:Response, next:NextFunction)=>{
    
    try {
        const user = req.user

        if(user){
            const food = await Food.find({vendorId:user._id})
            if(food){
                return res.json(food)
            }
        }
        

        
    } catch (error) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/vendor/food",
        }) 
    }
}