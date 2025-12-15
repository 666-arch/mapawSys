import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    //加载环境变量
    ConfigModule.forRoot({
      isGlobal: true, // 全局可用
      envFilePath: ['.env'], //可加载多个环境
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        //env
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        cli: {
            entitiesDir: "entity",
        },
        synchronize: config.get<string>('NODE_ENV') === 'development',
        connectorPackage: 'mysql2',
        // 开启SQL日志
        logging: config.get<string>('NODE_ENV') === 'development',
        logger: 'advanced-console', // 详细的SQL日志
        //production环境可额外配置
      }),
    }),
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
