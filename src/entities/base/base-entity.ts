import { CreateDateColumn, PrimaryColumn } from "typeorm";

export abstract class BaseContent { 
    @PrimaryColumn({ type: 'bigint'})
    id: number;

    @CreateDateColumn({ name: 'create_at' })
    createAt: Date; //创建时间
  
    @CreateDateColumn({ name: 'update_at' })
    updateAt: Date; //修改时间
}