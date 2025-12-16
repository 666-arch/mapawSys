import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

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
            secretOrkey: configService.get('JWT_SECRET'),
            passReqToCallBack: true,
        })
    }
    validate(req: Request, payload: any) {
        // const refreshToken = req.body.refreshToken
    }
}