import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseContent } from "./base/base-entity";
import { Poi } from "./poi.entity";
import { Plan } from "./plan.entity";
import { DailyPlanItem } from "./daily-plan-item.entity";

@Entity({ name: 'tb_daily_plan'})
export class DailyPlan extends BaseContent {
    @Column({ length: 100, nullable: true })
    title: string | null; //标题

    @Column({ type: 'int', name: 'day_index' })
    dayIndex: number; //第几天, 1...n

    @Column({ length: 50, nullable: true })
    weather: string | null; //天气状况 

    @Column({ length: 50, nullable: true })
    transport: string | null; //交通方式

    // @ManyToOne(()=> Poi, dp => dp.dailyPlan, { nullable: false, onDelete: 'CASCADE'})
    // poi: Poi;

    @ManyToOne(() => Plan, p => p.dailyPlans, { nullable: false, onDelete: 'CASCADE' })
    plan: Plan;

    @OneToMany(() => DailyPlanItem, dpi => dpi.dailyPlan)
    items: DailyPlanItem[];
}