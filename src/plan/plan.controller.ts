import { Body, Controller, Param, Post, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { PlanService } from './plan.service';
import { JwtAuthGuard } from 'src/user/auth/guards/jwt-auth.guard';
import { CreatePlanDto } from 'src/dto/plan/createPlan.dto';

@UseGuards(JwtAuthGuard)
@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) { }
  /**
   * 创建新攻略计划
   * @param req 请求对象
   * @param planDto 攻略计划数据传输对象
   * @returns 创建结果
   */
  @Post('/create-plan')
  async createPlan(@Req() req, @Body() planDto: CreatePlanDto) {
    const user = req?.user ?? null;
    const userId = user?.id ?? user?.userId ?? user?.sub;
    if (!userId) {
      throw new UnauthorizedException('无法识别的用户');
    }
    if (!planDto) {
      throw new UnauthorizedException('计划数据不能为空');
    }
    return this.planService.createPlan(userId, planDto);
  }

  /**
   * 修改已有计划
   * @param req 请求对象
   * @param planDto 计划数据传输对象
   * @param planId 计划 ID
   * @returns 修改结果
   */
  @Post('/modify-plan')
  async modifyPlan(@Req() req, @Body() planDto: CreatePlanDto, @Query('planId') planId: number) {
    const user = req?.user ?? null;
    const userId = user?.id ?? user?.userId ?? user?.sub;
    if (!userId) {
      throw new UnauthorizedException('无法识别的用户');
    }
    if (!planId) {
      throw new UnauthorizedException('计划 ID 不能为空');
    }
    if (!planDto) {
      throw new UnauthorizedException('计划数据不能为空');
    }
    return this.planService.modifyPlan(userId, planId, planDto);
  }

  /**
   * 生成每日行程
   * @param req 请求对象
   * @param planId 计划 ID
   * @returns 生成结果
   */
  @Post('/create-daily-plan/:planId')
  async createDailyPlay(@Req() req, planId: number) {
    const user = req?.user ?? null;
    const userId = user?.id ?? user?.userId ?? user?.sub;
    if (!userId) {
      throw new UnauthorizedException('无法识别的用户');
    }
    return this.planService.generateDailyPlan(userId, planId);
  }
}
