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

    async createPlan(userId: number, planDto: Partial<CreatePlanDto>) {
        const newPlan = this.planRepo.create({
            ...planDto,
            user: { id: userId },
        });
        const savedPlan = await this.planRepo.save(newPlan);
        return { success: true, data: savedPlan };
    }
}
