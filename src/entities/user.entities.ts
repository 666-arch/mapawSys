import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number; //用户主键id
    
    @Column({length: 50})
    username: string; //用户名

    @Column({length: 255})
    password: string; //密码

    @Column({length: 255})
    phone: string; //手机号

    @Column({length: 100})
    email: string; //邮箱

    @Column({ length: 10})
    gender: string; //性别

    @Column({ length: 255})
    avatar: string; //头像

    @CreateDateColumn({ name: 'create_at'})
    createAt: Date; //创建时间

    @CreateDateColumn({ name: 'update_at'})
    updateAt: Date; //修改时间
}