import { Entity, ManyToOne } from "typeorm";
import { BaseContent } from "./base/base-entity";
import { DailyPlan } from "./daily-plan.entity";
import { Poi } from "./poi-entity";
import { User } from "./user.entity";

@Entity({ name: 'user_favorite'})
export class UserFavorite extends BaseContent {
    @ManyToOne(()=> User, u=>u.favorites, { nullable: false, onDelete: 'CASCADE'})
    user: User;

    @ManyToOne(()=> Poi, u=>u.favorite, { nullable: false, onDelete: 'CASCADE'})
    poi: Poi;
}