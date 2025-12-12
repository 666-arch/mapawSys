    import { Column, Entity, ManyToMany } from "typeorm";
    import { BaseContent } from "./base/base-entity";
    import { Poi } from "./poi-entity";

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

        @ManyToMany(() => Poi, poi => poi.dpItem, { nullable: false, onDelete: 'CASCADE'})
        poi: Poi;
    }