import { Column, Entity, OneToMany } from "typeorm";
import { BaseContent } from "./base/base-entity";
import { Plan } from "./plan.entity";

@Entity({ name: 'tb_cities' })
export class City extends BaseContent{
    @OneToMany(() => Plan, plan => plan.city)
    plans: Plan[]; //一个城市可以有多个不同的计划

    @Column({ length: 50 })
    name: string; //城市名称 

    @Column({ length: 50 })
    country: string; //国家

    @Column({ length: 255, nullable: true })
    description: string | null; //描述

    @Column({ length: 255 })
    image_url: string;

    @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
    lat: number | null; //纬度
  
    @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
    lng: number | null; //经度
}