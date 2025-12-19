import { Controller, Post, Body } from "@nestjs/common";
import { RegisterUserDto } from "src/dto/user/register.dto";
import { AuthService } from "./auth.service";
import { UserDto } from "src/dto/user/user.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * 用户注册 Api
     * @param user 
     * @returns 
     */
    @Post('/register')
    async RegisterUser(@Body() user: UserDto) {
        if (!user) {
            throw new Error('用户数据为空');
        }
        //验证用户验证码
        if (!user.phone) {
            throw new Error('手机号不能为空');
        }
       return this.authService.LoginBySmsCode(user);
    }

    /**
     * 发送短信验证码 Api
     * @param phone 
     * @returns 
     */
    @Post('/send-sms-code')
    async sendSmsCode(@Body('phone') phone: string) {
        if (!phone) {
            throw new Error('手机号不能为空');
        }
        return await this.authService.sendSmsCode(phone);
    }
}