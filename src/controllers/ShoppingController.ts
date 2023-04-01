import express, {Request, Response, NextFunction} from "express";
import { FoodDoc, Vendor } from "../models";


export const GetFoodAvailability = async(req:Request, res:Response, next:NextFunction)=>{
    
    try {

        const pincode = req.params.pincode;

        const result = await Vendor.find({pincode:pincode, serviceAvailable:true})
        .sort([['rating', 'descending']])
        .populate('foods')

        if(result.length>0){
            return res.status(200).json(result)
        }

        return res.status(400).json({"message":"Data not found"})
        
    } catch (error) {
        
    }
}

export const GetTopRestaurants = async(req:Request, res:Response, next:NextFunction)=>{
    
    try {
        
        const pincode = req.params.pincode;
        const result = await Vendor.find({pincode:pincode, serviceAvailable:true})
        .sort([['rating', 'descending']])
        .limit(1)

        if(result.length>0){
            return res.status(200).json(result)
        }
    } catch (error) {
        
    }
} 

export const SearchFoods = async(req:Request, res:Response, next:NextFunction)=>{
    
    try {

        const pincode = req.params.pincode;
        const result = await Vendor.find({pincode:pincode, serviceAvailable:true})
       .populate('foods')

        if(result.length>0){
            let foodResult:any = []

            result.map(item => foodResult.push(...item.foods))
         
            return res.status(200).json(foodResult)
        }
        
    } catch (error) {
        
    }
}

export const GetFoodIn30Mins = async(req:Request, res:Response, next:NextFunction)=>{
    
    try {


        const pincode = req.params.pincode;
        const result = await Vendor.find({pincode:pincode, serviceAvailable:true})
       .populate('foods')

        if(result.length>0){
            let foodResult:any = []

            result.map(vendor=>{
                const foods = vendor.foods as [FoodDoc]

                foodResult.push(...foods.filter(food => food.readyTime <= 30))
            })

            return res.status(200).json(foodResult)
        }
        
    } catch (error) {
        
    }
}

export const GetFoodMoreThan30Mins = async(req:Request, res:Response, next:NextFunction)=>{
    
    try {


        const pincode = req.params.pincode;
        const result = await Vendor.find({pincode:pincode, serviceAvailable:true})
       .populate('foods')

        if(result.length>0){
            let foodResult:any = []

            result.map(vendor=>{
                const foods = vendor.foods as [FoodDoc]

                foodResult.push(...foods.filter(food => food.readyTime > 30))
            })

            return res.status(200).json(foodResult)
        }
        
    } catch (error) {
        
    }
}



export const RestaurantById = async(req:Request, res:Response, next:NextFunction)=>{
    
    try {

           
        const id = req.params.id;
        const result = await Vendor.findById({_id:id}).populate('foods')
        

        if(result){
            return res.status(200).json(result)
        }
        
    } catch (error) {
        
    }
}