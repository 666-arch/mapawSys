import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RedisModule } from 'src/redis/redis.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
        RedisModule,
		AuthModule,
		PassportModule,
	],
	controllers: [
		UserController,
	],
	providers: [
		UserService,
        // RedisModule
	],
	exports: [TypeOrmModule, RedisModule, AuthModule, PassportModule],
})
export class UserModule { }
