import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { RefreshToken } from "src/entity/refresh-token.entity";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import bcrypt from 'bcrypt'
import { LoginDto } from "src/dto/user/login.dto";
import { Redis } from "ioredis";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,

        @InjectRepository(RefreshToken)
        private readonly refreshTokenRepo: Repository<RefreshToken>,

        private readonly jwtService: JwtService,

        @Inject('REDIS_CLIENT') //导入注册好的全局 Redis
        private readonly redis: Redis,
    ) { }

    /**
     * 登录
     */

    /**
     * validate ByPassword
     */
    private async validateByPassowrd(phone: string, password: string): Promise<User> {
        const user = await this.userRepo.findOne({
            where: { phone }
        });
        if (!user) {
            throw new UnauthorizedException('用户不存在');
        }
        const matchPwd = await bcrypt.compare(password, user.password);
        if (!matchPwd) {
            throw new UnauthorizedException('用户密码错误');
        }
        return user;
    }

    /**
     * validate BySmsCode
     */
    private async validateSmsCode(phone: string, code: string): Promise<User> {
        const cacheCode = await this.redis.get(`sms:${phone}`);
        if (!cacheCode) {
            throw new UnauthorizedException('验证码已过期');
        }
        if (cacheCode !== code) {
            throw new UnauthorizedException('验证码错误，请重试');
        }
        //验证码是一次性的，用完即删
        await this.redis.del(`sms:${phone}`);

        //验证手机号
        let user = await this.userRepo.findOne({
            where: { phone },
        });

        //如果 user 不存在则自动注册
        if (!user) {
            user = this.userRepo.create({ phone });
            await this.userRepo.save(user);
        }
        return user;
    }
    /**
     * create access Token
     */
    
    
    /**
     * create Refresh Token
     */

    /**
     * 刷新 Access Token
     */

    /**
     * 登出（撤销 Refresh Token）
     */

}