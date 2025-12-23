import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlanDto } from 'src/dto/plan/createPlan.dto';
import { Plan } from 'src/entity/plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanService {
    constructor(
        @InjectRepository(Plan)
        private readonly planRepo: Repository<Plan>,
    ) { }

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
}
