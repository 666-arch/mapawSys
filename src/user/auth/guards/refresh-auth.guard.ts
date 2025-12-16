import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
/**
 * AuthGuard守卫 来自 passport
 * 1.调用 passport.authenticate('jwt-refresh')
 * 2.触发 RefreshStrategy
 * 它只是一个触发器，通知 nest 接口需要通过何种 Strategy 来鉴权
 */
@Injectable()
export class RefreshAuthGuard extends AuthGuard('jwt-refresh') {}