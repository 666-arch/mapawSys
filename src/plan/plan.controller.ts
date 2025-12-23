import { Controller, Post, UseGuards } from '@nestjs/common';
import { PlanService } from './plan.service';
import { JwtAuthGuard } from 'src/user/auth/guards/jwt-auth.guard';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create-plan')
  async createPlan() {
    return { message: 'Plan created successfully' };
  }
}
