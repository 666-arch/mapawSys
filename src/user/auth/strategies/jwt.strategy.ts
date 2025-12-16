import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
/**
 * AccessToken校验 业务API大门
 */
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService) {
        super({
            //验证token从何而来，会自动去找 Authorization: Bearer xxx
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            //通过JWT_SECRET验证该签名是不是当前服务签署的
            secretOrKey: config.get('JWT_SECRET'),
        })
    }
    /**
     * 何时调用？
     * token是否存在 & 格式是否正确 & 签名是否正确 & 是否过期
     * @param args 
     */
    validate(payload: any): unknown {
        // throw new Error("Method not implemented.");
        return {
            userId: payload.userId,
            email: payload.email,
            // role: payload.role,
        };
    }
}