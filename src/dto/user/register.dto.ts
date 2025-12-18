import { IsString, Validate } from "class-validator";
import { IsPhoneNumberConstraint } from "../validator/phone.constraint";

export class RegisterUserDto {
    @IsString()
    @Validate(IsPhoneNumberConstraint)
    phone: string;
}