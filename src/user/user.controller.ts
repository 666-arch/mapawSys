import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UpdateUserDto } from 'src/dto/user/updateUser.dto';

@Controller('user')
export class UserController {
    // @Post('/profile')
    // getProfile() {
    //     return { message: 'User profile endpoint' }
    // }
    
    /**
     * 更新用户信息
     * @param userInfo
     * @returns
     */
    @UseGuards(JwtAuthGuard)
    @Post('/resetProfile')
    async saveProfile(@Body() userInfo: UpdateUserDto) {
        return { message: userInfo }
    }
}
