import { Controller, Post, Body } from "@nestjs/common";
import { RegisterUserDto } from "src/dto/user/register.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async RegisterUser(user: RegisterUserDto) {
        if (!user) {
            throw new Error('用户数据为空');
        }
        //验证用户验证码
        if (!user.phone) {
            throw new Error('手机号不能为空');
        }
        // this.authService.LoginBySmsCode(user, user.code);
        
        //创建用户

        //保存用户
    }

    @Post('/send-sms-code')
    async sendSmsCode(@Body('phone') phone: string) {
        if (!phone) {
            throw new Error('手机号不能为空');
        }
        return await this.authService.sendSmsCode(phone);
    }
}