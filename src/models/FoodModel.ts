import mongoose, {Schema, Document } from "mongoose";

export interface FoodDoc extends Document {
    vendorId: string;
    name: string;
    price: number;
    description: string;
    category: string;
    readyTime: number;
    foodType: string;
    rating: number;
    images: [string];
}


const FoodSchema = new Schema({
    vendorId: {type:String},
    name: {type:String, required:true},
    price: {type:Number, required:true},
    description: {type:String, required:true},
    category: {type:String},
    readyTime: {type:Number},
    foodType:{type:String},
    rating:{type:Number},
    images:{type:[String]}
},{
    toJSON:{
        transform(doc, ret){
            delete ret._v
            delete ret.createdAt,
            delete ret.updatedAt
        }
    },
    timestamps: true
})

const Food = mongoose.model<FoodDoc>("food", FoodSchema)

export {Food}