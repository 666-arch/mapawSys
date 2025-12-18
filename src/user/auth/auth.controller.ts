import { Controller, Post } from "@nestjs/common";
import { RegisterUserDto } from "src/dto/user/register.dto";

@Controller('auth')
export class AuthController {
    @Post('/register')
    async RegisterUser(user: RegisterUserDto) {
        if (!user) {
            throw new Error('用户数据为空');
        }
        //验证用户验证码

        //创建用户

        //保存用户
    }
}