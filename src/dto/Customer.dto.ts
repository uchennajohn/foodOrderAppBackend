import { IsEmail, IsEmpty, Length } from "class-validator";

export { IsEmail, IsEmpty, Length} from "class-validator"

export class CreateCustomerInputs{

    @IsEmail()
    email: string;

    
    @Length(6, 12)
    password: string;

    
    @Length(7,12) 
    phone: string;
}


export interface CustomerPayload{
    _id: string;
    email: string;
    isVerified: boolean;
}