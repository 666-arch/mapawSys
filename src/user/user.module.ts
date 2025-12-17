import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from './auth/auth.service';
import { RefreshToken } from 'src/entity/refresh-token.entity';
import { JwtService } from '@nestjs/jwt';
import { RedisModule } from 'src/redis/redis.module';
@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
        RedisModule
	],
	controllers: [
		UserController,
	],
	providers: [
		UserService,
        // RedisModule
	],
	exports: [TypeOrmModule, RedisModule],
})
export class UserModule { }
