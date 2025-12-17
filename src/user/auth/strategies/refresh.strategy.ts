import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { Request } from "express";

/**
 *  RefresgToken校验 只服务 /auth/refresh
 * 'jwt-refresh' 定义 passport Strategy 的名称
 */
@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        private configService: ConfigService,
        private authService: AuthService
    ) {
        super({
            //token 从哪里获取 --> : body { "refreshToken" : "xxx"}
            jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
            secretOrKey: configService.get('JWT_SECRET'),
            passReqToCallback: true,
        })
    }
    /**
     * 校验 refreshToken 是否有效
     * @param req 
     * @param payload 
     * @returns 
     */
    validate(req: Request, payload: any) {
        // 1. 获取 refreshToken
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            throw new Error('缺少 refreshToken');
        }
        // 2. refreshToken 是否存在 & 是否过期 & 是否有效（查库）
        return this.authService.validateRefreshToken(refreshToken, payload);
        // 3. 校验通过则返回用户对象，失败则抛异常
    }
}