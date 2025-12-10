import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'tb_plan' })
export class Plan {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number; //主键id

    @ManyToOne(() => User, u => u.plans, { nullable: false, onDelete: 'CASCADE' })
    user: User; //多个Plan对应一个用户

    @Column({ length: 100 })
    title: string; //攻略大标题

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

    @Column({ name: 'create_at' })
    createAt: Date;

    @Column({ name: 'update_at' })
    updateAt: Date;
}