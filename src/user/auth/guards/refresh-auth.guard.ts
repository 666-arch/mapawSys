import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';  // Add this import
import { AuthService } from '../auth.service';

// /**
//  * AuthGuard守卫 来自 passport
//  * 1.调用 passport.authenticate('jwt-refresh')
//  * 2.触发 RefreshStrategy
//  * 它只是一个触发器，通知 nest 接口需要通过何种 Strategy 来鉴权
//  * 可能需要再做个 限制刷新频率的功能
//  */
// @Injectable()
// export class RefreshAuthGuard extends AuthGuard('jwt-refresh') {
//   // 防刷
//   // canActivate(context: ExecutionContext){
//   //     return super.canActivate(context);
//   // }
//   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {  // Add this return type
//     const req = context.switchToHttp().getRequest();
//     console.log('🔥 RefreshAuthGuard triggered');
//     console.log('🔥 req.body:', req.body);
//     return super.canActivate(context);
//   }
// }
@Injectable()
export class RefreshAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const refreshToken = req.body?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('缺少 refreshToken');
    }

    const user = await this.authService.validateRefreshToken(refreshToken);
    req.user = user;

    return true;
  }
}
