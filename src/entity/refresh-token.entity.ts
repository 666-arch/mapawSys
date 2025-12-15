import { Column, Entity, Index, ManyToOne } from "typeorm";
import { BaseContent } from "./base/base-entity";
import { User } from "./user.entity";

/** 
 * Refresh Token 长期凭证
 * 有效期：7-30天
 * 每次刷新都会轮换（防劫持）
*/
@Entity({ name: 'tb_refresh_token' })
@Index('uniq_token', ['token'], { unique: true }) //保证token必须唯一性
export class RefreshToken extends BaseContent {
    @Column({ length: 500 })
    token: string; //token

    @Column({ name: 'expires_at', type: 'datetime' })
    expiresAt: Date; //token 过期时间

    @ManyToOne(() => User, user => user.refreshToken, { onDelete: 'CASCADE' })
    user: User;
}