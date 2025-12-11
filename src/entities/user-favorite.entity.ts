import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'user_favorite'})
export class UserFavorite {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ManyToOne(()=> User, u=>u.favorites, { nullable: false, onDelete: 'CASCADE'})
    user: User;

    @CreateDateColumn({ name: 'create_at' })
    createAt: Date; //创建时间
  
    @CreateDateColumn({ name: 'update_at' })
    updateAt: Date; //修改时间
}