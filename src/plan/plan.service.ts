import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlanDto } from 'src/dto/plan/createPlan.dto';
import { DailyPlanItem } from 'src/entity/daily-plan-item.entity';
import { DailyPlan } from 'src/entity/daily-plan.entity';
import { Plan } from 'src/entity/plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepo: Repository<Plan>,

    @InjectRepository(DailyPlan)
    private readonly dailyPlanRepo: Repository<DailyPlan>,

    @InjectRepository(DailyPlanItem)
    private readonly itemRepo: Repository<DailyPlanItem>,
  ) {}

  /**
   * 创建新计划
   * @param userId 用户 ID
   * @param planDto 计划数据传输对象
   * @returns 创建结果
   */
  async createPlan(userId: number, planDto: Partial<CreatePlanDto>) {
    const newPlan = this.planRepo.create({
      ...planDto,
      user: { id: userId },
      city: { id: planDto.cityId },
      createAt: new Date(),
      updateAt: new Date(),
    });
    const savedPlan = await this.planRepo.save(newPlan);
    return { success: true, data: savedPlan };
  }

  /** 
   * 生成每日行程
   * @param userId 用户 ID
   * @param planId 计划 ID
   * @returns 生成结果
   */
  async generateDailyPlan(userId: number, planId: number) {
    const plan = await this.planRepo.findOne({
      where: { id: planId },
      relations: ['user', 'dailyPlans'],
    });
    if (!plan) return new NotFoundException('计划不存在');
    if (plan.user.id !== userId) throw new NotFoundException('无权进行该操作');
    if (plan.dailyPlans && plan.dailyPlans.length > 0)
      throw new NotFoundException('行程已生成，如需重生成请先删除');

    for (let day = 1; day <= plan.days; day++) {
      const daily = await this.dailyPlanRepo.save(
        this.dailyPlanRepo.create({
          dayIndex: day,
          plan,
        }),
      );

      await this.itemRepo.save([
        this.itemRepo.create({
          place: `景点 A - Day ${day}`,
          startTime: '09:00',
          endTime: '11:00',
          dailyPlan: daily,
        }),
        this.itemRepo.create({
          place: `景点 B - Day ${day}`,
          startTime: '14:00',
          endTime: '17:00',
          dailyPlan: daily,
        }),
      ]);
    }
    return { message: '行程生成成功' };

  }
}
