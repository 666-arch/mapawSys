import { Body, Controller, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { PlanService } from './plan.service';
import { JwtAuthGuard } from 'src/user/auth/guards/jwt-auth.guard';
import { CreatePlanDto } from 'src/dto/plan/createPlan.dto';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) { }

  @UseGuards(JwtAuthGuard)
  @Post('/create-plan')
  async createPlan(@Req() req, @Body() planDto: CreatePlanDto) {
    const user = req?.user ?? null;
    const userId = user?.id ?? user?.userId ?? user?.sub;
    if (!userId) {
      throw new UnauthorizedException('无法识别的用户');
    }
    return this.planService.createPlan(userId, planDto);
  }
}
