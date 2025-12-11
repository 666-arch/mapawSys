import { Column, Entity } from "typeorm";
import { BaseContent } from "./base/base-entity";

@Entity({ name: 'tb_daily_plan_item'})
export class DailyPlanItem extends BaseContent {
    @Column({ length: 255 })
    place: string;

    @Column({ length: 255 })
    description: string | null;

    @Column({ name: 'start_time'})
    startTime: Date;
    
    @Column({ name: 'end_time'})
    endTime: Date;
}