import { Entity, ManyToOne } from "typeorm";
import { BaseContent } from "./base/base-entity";
import { User } from "./user.entity";

@Entity({ name: 'user_favorite'})
export class UserFavorite extends BaseContent {
    @ManyToOne(()=> User, u=>u.favorites, { nullable: false, onDelete: 'CASCADE'})
    user: User;
}