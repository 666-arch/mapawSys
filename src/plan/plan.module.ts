import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from 'src/entity/plan.entity';
import { DailyPlan } from 'src/entity/daily-plan.entity';
import { DailyPlanItem } from 'src/entity/daily-plan-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plan, DailyPlan, DailyPlanItem])],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
