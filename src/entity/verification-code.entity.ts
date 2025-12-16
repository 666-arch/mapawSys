import { Column, Entity, ManyToOne } from "typeorm";
import { BaseContent } from "./base/base-entity";
import { User } from "./user.entity";

@Entity({ name: 'tb_verification_code' })
export class VerificationCode extends BaseContent {
    @Column({ length: 50 })
    codeNum: string; //验证码

    @Column({ name: 'expires_at', type: 'datetime' })
    expiresAt: Date; //验证码 过期时间

    @ManyToOne(() => User, u => u.verificationCode, { onDelete: 'CASCADE' })
    user: User;
}