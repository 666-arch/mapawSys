import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Plan } from "./plan.entity";
@Entity({ name: 'tb_user' })
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number; //用户主键id

    @OneToMany(() => Plan, (plan) => plan.user)
    plans: Plan[]; //一个用户可以有多个 Plan

    @Column({ length: 50 })
    username: string; //用户名

    @Column({ length: 255 })
    password: string; //密码

    @Column({ length: 255, nullable: true })
    phone: string | null; //手机号

    @Index()
    @Column({ length: 100, nullable: true })
    email: string | null; //邮箱

    @Column({ length: 10, nullable: true })
    gender: string | null; //性别

    @Column({ length: 255, nullable: true })
    avatar: string | null; //头像

    @CreateDateColumn({ name: 'create_at' })
    createAt: Date; //创建时间

    @CreateDateColumn({ name: 'update_at' })
    updateAt: Date; //修改时间
}