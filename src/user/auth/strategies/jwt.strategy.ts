import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from '@nestjs/passport';
import { Request } from "express";
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
     * 1. 通过 Guard 装饰器标注守卫后会自动执行 validate
     * @param payload 
     * @returns 
     */
    validate(payload: any): unknown {
        //这里可以做一些黑名单处理，目前暂不需要
        return {
            userId: payload.userId,
            phone: payload.phone,
        };
    }
}