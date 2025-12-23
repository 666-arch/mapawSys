import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from "src/entity/refresh-token.entity";
import { User } from "src/entity/user.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategies/jwt.strategy";
// import { RefreshStrategy } from "./strategies/refresh.strategy";
@Module({
    imports: [
        //注册实体
        TypeOrmModule.forFeature([User, RefreshToken]), 
        //导入认证库，Passport
        PassportModule,
        //签发token
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                //15分钟过期
                signOptions: { expiresIn: '15m' }
            }),
        })
    ],
    //用户需要经过 Auth 来认证
    controllers: [AuthController],
    //service 注册
    providers: [
        AuthService, //处理 token 逻辑
        JwtStrategy, //校验 token 可信度
        // RefreshStrategy, 
    ],
    exports: [JwtStrategy]
})
export class AuthModule {}