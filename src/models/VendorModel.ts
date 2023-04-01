import mongoose,{Schema, Document, Model} from "mongoose";


interface VendorDoc extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    ownerName: string;
    foodType:[string];
    pincode: string; 
    salt: string; 
    serviceAvailable:boolean;
    rating: number;
    coverImage: [string];
    foods: any
}

const VendorSchema = new Schema({
    name: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    phone: {type:String, required:true},
    address: {type:String, required:true},
    ownerName: {type:String, required:true},
    foodType:{type:[String]},
    pincode: {type:String, required:true},
    salt: {type:String, required:true},
    serviceAvailable: {type:Boolean},
    rating: {type:Number },
    coverImage: {type:[String]},
    foods: [{type:mongoose.SchemaTypes.ObjectId, ref:'food'}]

},{
    toJSON:{
        transform(doc,ret){
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
            delete ret.password;
            delete ret.salt;
        }
    },
    timestamps:true
})

const Vendor = mongoose.model<VendorDoc>('vendor', VendorSchema)  
export {Vendor}