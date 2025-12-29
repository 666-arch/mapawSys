import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { BaseContent } from "./base/base-entity";
import { Poi } from "./poi.entity";
import { DailyPlan } from "./daily-plan.entity";

@Entity({ name: 'tb_daily_plan_item' })
export class DailyPlanItem extends BaseContent {
    @Column({ length: 255 })
    place: string;

    @Column({ length: 255 })
    description: string | null;

    @Column({ name: 'start_time' })
    startTime: Date;

    @Column({ name: 'end_time' })
    endTime: Date;

    // @ManyToMany(() => Poi, p => p.dailyPlanItem, { nullable: false, onDelete: 'CASCADE'})
    // poi: Poi;

    @ManyToOne(() => DailyPlan, dp => dp.items, { nullable: false, onDelete: 'CASCADE' })
    dailyPlan: DailyPlan;
}