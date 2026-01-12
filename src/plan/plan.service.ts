import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
    ) { }
    
    /**
     * 根据用户 ID 获取其所有计划
     * @param userId 用户 ID
     * @returns 计划列表
     */
    async getPlansByUserId(userId: number){
        const plans = await this.planRepo.find({
            where: { user: { id: userId } },
        })
        
        return { success: true, data: plans, count: plans.length };
    }

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
     * 修改已有计划
     * @param userId 用户 ID
     * @param planId 计划 ID
     * @param planDto 计划数据传输对象
     * @returns 修改结果
     */
    async modifyPlan(userId: number, planId: number, planDto: Partial<CreatePlanDto>) {
        const plan = await this.planRepo.findOne({
            where: { id: planId },
            relations: ['user'],
        });
        if (plan.user.id !== userId) throw new UnauthorizedException('您无权进行该操作');
        Object.assign(plan, planDto, { updateAt: new Date() });
        const updatePlan = await this.planRepo.save(plan);
        return { success: true, data: updatePlan };
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
        if (plan.dailyPlans && plan.dailyPlans.length > 0) throw new NotFoundException('行程已生成，如需重生成请先删除');

        // 计划开始日期（如 2025-12-20）
        const planStartDate = plan.startTime ? new Date(plan.startTime) : new Date();
        for (let day = 1; day <= plan.days; day++) {
            const daily = await this.dailyPlanRepo.save(
                this.dailyPlanRepo.create({
                    dayIndex: day,
                    plan,
                }),
            );

            // 每天上午和下午各一个景点，时间精确到分钟
            const timeSlots = [
                { hour: 9, minute: 0, duration: 120, place: `景点 A - Day ${day}` }, // 2小时
                { hour: 14, minute: 0, duration: 180, place: `景点 B - Day ${day}` }, // 3小时
            ];
            await this.itemRepo.save(
                timeSlots.map(slot => {
                    // 计算当天日期
                    const date = new Date(planStartDate);
                    date.setDate(planStartDate.getDate() + day - 1);
                    // 开始时间
                    const startDateTime = new Date(date);
                    startDateTime.setHours(slot.hour, slot.minute, 0, 0);
                    // 结束时间
                    const endDateTime = new Date(startDateTime);
                    endDateTime.setMinutes(startDateTime.getMinutes() + slot.duration);
                    // 格式化为 'YYYY-MM-DD HH:mm'
                    const format = (d: Date) => `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
                    return this.itemRepo.create({
                        place: slot.place,
                        startTime: format(startDateTime),
                        endTime: format(endDateTime),
                        dailyPlan: daily,
                    });
                })
            );
        }
        return { message: '行程生成成功' };
    }
}
