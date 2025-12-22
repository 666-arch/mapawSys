import { Body, Controller, Get, Post, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
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
     * @param req 来自认证流程（防伪造）
     * @param userInfo 用户信息
     */
    @UseGuards(JwtAuthGuard)
    @Post('/resetProfile')
    async saveProfile(@Req() req, @Body() userInfo: UpdateUserDto) {
        const user = req?.user ?? null;
        const userId = user?.id ?? user?.userId ?? user?.sub;
        if (!userId) {
            throw new UnauthorizedException('无法识别的用户');
        }
        // 覆盖客户端传来的 id，防止伪造
        userInfo.id = userId;
        await this.userService.setUserProfile(userInfo);
        return { message: '用户信息更新成功' };
    }
}
