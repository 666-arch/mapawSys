import { Column, PrimaryGeneratedColumn } from "typeorm";

export class DailyPlan {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ length: 100, nullable: true })
    title: string | null; //标题

    @Column({ type: 'int', name: 'day_index' })
    dayIndex: number; //第几天, 1...n

    @Column({ length: 50, nullable: true })
    weather: string | null; //天气状况 

    @Column({ length: 50, nullable: true })
    transport: string | null; //交通方式

    @Column({ name: 'create_at' })
    createAt: Date;

    @Column({ name: 'update_at' })
    updateAt: Date;
}