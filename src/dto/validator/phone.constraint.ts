import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { isValidPhoneNumber } from 'libphonenumber-js';
/**
 * 自定义手机号验证器 Dto
 */
@ValidatorConstraint({ name: 'isPhoneNumber', async: false })
export class IsPhoneNumberConstraint
    implements ValidatorConstraintInterface {
    validate(phone: string, args: ValidationArguments) {
        return isValidPhoneNumber(phone, 'CN');
    }
    defaultMessage(args?: ValidationArguments): string {
        return '手机号格式不正确';
    }
}