import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { RefreshToken } from "src/entity/refresh-token.entity";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { Redis } from "ioredis";
import { UserDto } from "src/dto/user/user.dto";
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,

        @InjectRepository(RefreshToken)
        private readonly refreshTokenRepo: Repository<RefreshToken>,

        private readonly jwtService: JwtService,

        //导入注册好的全局 Redis
        @Inject('REDIS_CLIENT')
        private readonly redis: Redis,
    ) { }

    /**
     * 校验 refreshToken 是否有效
     * @param refreshToken refresh token 字符串
     * @param payload JWT payload（含用户id等）
     * @returns User
     */
    async validateRefreshToken(refreshToken: string, payload: any): Promise<User> {
        // 1. 查找 refreshToken 记录
        const tokenRecord = await this.refreshTokenRepo.findOne({
            where: { token: refreshToken },
            relations: ['user'],
        });
        if (!tokenRecord) {
            throw new UnauthorizedException('Refresh token 不存在');
        }
        // 2. 检查是否过期
        if (tokenRecord.expiresAt < new Date()) {
            throw new UnauthorizedException('Refresh token 已过期');
        }
        // 3. 检查 token 是否属于当前用户
        if (payload && tokenRecord.user && tokenRecord.user.id !== payload.sub) {
            throw new UnauthorizedException('Refresh token 与用户不匹配');
        }
        // 4. 返回用户对象
        return tokenRecord.user;
    }

    /**
     * 登录（passowrd）
     * @param user 
     * @returns 
     */
    async LoginByPassowd(user: User) {
        if (!user) throw new UnauthorizedException('错误调用，数据对象为空');
        const _user = await this.validateByPassowrd(user.phone, user.password);
        this.createToken(_user);
    }

    /**
     * 登录（smsCode）
     * @param user 用户
     * @param code 验证码
     */
    async LoginBySmsCode(user: User, code: string) {
        if (!user) throw new UnauthorizedException('错误调用，数据对象为空');
        const _user = await this.validateSmsCode(user.phone, code);
        this.createToken(_user);
    }

    /**
     * Token颁布
     * @param user 用户对象
     * @returns 
     */
    private async createToken(user: User) {
        const accessToken = this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user);
        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                phone: user.phone,
            }
        };
    }

    /**
     * validate ByPassword
     * @param phone 手机号
     * @param password 密码
     * @returns user
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
     * @param phone 手机号
     * @param code 验证码
     * @returns user
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
     * @param user 用户信息
     * @returns 
     */
    private generateAccessToken(user: User): string {
        return this.jwtService.sign(
            {
                sub: user.id,
                phone: user.phone
            },
            {
                expiresIn: '15m', //15min有效期
            },
        );
    }

    /**
     * create Refresh Token
     * @param user 用户信息
     * @returns 
     */
    private async generateRefreshToken(user: User): Promise<string> {
        const token = crypto.randomUUID();
        const refreshToken = this.refreshTokenRepo.create({
            user,
            token,
            expiresAt: this.getRefreshTokenExpiry(),
        });
        //生成后入库
        await this.refreshTokenRepo.save(refreshToken);
        return token;
    }

    /**
     * 重置 Access Token
     * @param user 
     * @returns 
     */
    async refreshAccessToken(user: User) {
        const accessToken = this.generateAccessToken(user);
        return { accessToken };
    }

    /**
     * token 撤销
     * @param userId 用户Id
     * @returns 
     */
    async logout(userId: number) {
        await this.refreshTokenRepo.update(
            { user: { id: userId }, isRevoked: false },
            { isRevoked: true },
        )
        return { success: true };
    }

    /**
     * 过期时间设置
     * @returns 
     */
    private getRefreshTokenExpiry() {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        return date;
    }
}