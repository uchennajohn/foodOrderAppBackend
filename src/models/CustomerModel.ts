import mongoose, {Schema, Document } from "mongoose";


interface CustomerDoc extends Document {
    email: string;
    lastName: string;
    firstName: string;
    phone: string;
    password: string;
    address: string;
    salt: string;
    otp: string;
    otpExpires: Date;
    lat: number;
    lng: number;
    isVerified: boolean;
}

const CustomerSchema = new Schema({
    email: {type:String, required:true},
    lastName: {type:String},
    firstName: {type:String},
    phone: {type:Number, required:true},
    password: {type:String, required:true},
    address: {type:String},
    salt: {type:String},
    otp: {type:Number, required:true},
    otpExpires: {type:Date, required:true},
    lat: {type:Number},
    lng: {type:Number},
    isVerified: {type:Boolean, required:true} 
},{
    toJSON:{
        transform(doc, ret){
            delete ret._v;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.password;
            delete ret.salt;
        }
    },
    timestamps: true
})

const Customer = mongoose.model<CustomerDoc>("customer", CustomerSchema) 

export {Customer}