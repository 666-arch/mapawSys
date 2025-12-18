import { IsString, Validate } from "class-validator";
import { IsPhoneNumberConstraint } from "../validator/phone.constraint";

export class RegisterUserDto {
    id: number;
    
    @IsString()
    @Validate(IsPhoneNumberConstraint)
    phone: string;

    code: string;
}