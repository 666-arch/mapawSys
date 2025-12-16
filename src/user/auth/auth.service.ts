import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { RefreshToken } from "src/entity/refresh-token.entity";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,

        @InjectRepository(RefreshToken)
        private readonly refreshTokenRepo: Repository<RefreshToken>,

        private readonly jwtService: JwtService,
    ){}

    /**
     * 登录
     */

    /**
     * validate userInfo
     */

    private async validateUser(phone: string, password: string): Promise<User> {
        const user = await this.userRepo.findOne({
            where: { phone },
        })
        if (!user) {
            throw new UnauthorizedException('用户不存在')
        }
        return user;
    }

    /**
     * create Access Token
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