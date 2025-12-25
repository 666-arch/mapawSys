import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { City } from "./city.entity";
import { BaseContent } from "./base/base-entity";
import { DailyPlan } from "./daily-plan.entity";

export enum TravelType {
    COUPLE = 'couple',
    FAMILY = 'family',
    SOLO = 'solo'
}

@Entity({ name: 'tb_plan' })
export class Plan extends BaseContent{
    @ManyToOne(() => User, u => u.plans, { nullable: false, onDelete: 'CASCADE' })
    user: User; 

    @ManyToOne(() => City, u => u.plans, { nullable: false, onDelete: 'CASCADE' })
    city: City;

    @OneToMany(() => DailyPlan, dailyPlan => dailyPlan.plan, { cascade: true })
    dailyPlans: DailyPlan[];

    @Column({ length: 100 })
    title: string; //攻略大标题

    @Column({ type: 'enum', enum: TravelType, nullable: true })
    travelType: TravelType | null; // couple / family / solo

    @Column({ type: 'int' })
    days: number; //天数

    @Column({ type: 'int', nullable: true })
    budget: number | null; //预算

    @Column({ type: 'date', nullable: true })
    startTime: string | null; //开始时间

    @Column({ type: 'date', nullable: true })
    endTime: string | null; //结束时间

    @Column({ type: 'text', nullable: true })
    summary: string | null; //文本摘要（可能来自AI）
}