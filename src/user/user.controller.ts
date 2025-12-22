import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UpdateUserDto } from 'src/dto/user/updateUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}
    /**
     * 更新用户信息
     * @param userInfo
     * @returns
     */
    @UseGuards(JwtAuthGuard)
    @Post('/resetProfile')
    async saveProfile(@Req() req, @Body() userInfo: UpdateUserDto) {
        // this.userService.setUserProfile(userInfo);
        return { message: '用户信息更新成功' };
    }
}
