import { Column, PrimaryGeneratedColumn } from "typeorm";

export class DailyPlanItem {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ length: 255 })
    place: string;

    @Column({ length: 255 })
    description: string | null;

    @Column({ name: 'start_time'})
    startTime: Date;
    
    @Column({ name: 'end_time'})
    endTime: Date;

    @Column({ name: 'create_at'})
    createAt: Date;

    @Column({ name: 'update_at'})
    updateAt: Date;
}