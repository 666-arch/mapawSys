import {
  Column,
  Entity,
  Index,
  OneToMany,
} from 'typeorm';
import { BaseContent } from './base/base-entity';
import { Plan } from './plan.entity';
import { UserFavorite } from './user-favorite.entity';
@Entity({ name: 'tb_user' })
export class User extends BaseContent {
  @OneToMany(() => Plan, (plan) => plan.user)
  plans: Plan[]; //一个用户可以有多个 Plan

  @OneToMany(() => UserFavorite, (fav) => fav.user)
  favorites: UserFavorite[]; //一个用户可以收藏多个

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
}
