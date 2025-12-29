import { Column, Entity, OneToMany } from 'typeorm';
import { BaseContent } from './base/base-entity';
import { DailyPlanItem } from './daily-plan-item.entity';
import { DailyPlan } from './daily-plan.entity';
import { UserFavorite } from './user-favorite.entity';

export type POIType = 'spot' | 'food' | 'hotel';

//用户一切可能需要去的地方
@Entity({ name: 'tb_poi' })
export class Poi extends BaseContent {
  @Column({ length: 100 })
  name: string; //名称

  @Column({ type: 'enum', enum: ['spot', 'food', 'hotel'] })
  type: POIType; //类型

  @Column({ length: 100, nullable: true })
  openingHours: string | null; //营业时间

  @Column({ length: 50, nullable: true })
  priceRange: string | null; //价格区间

  @Column({ type: 'decimal', precision: 2, scale: 1, nullable: true })
  rating: number | null; //评分

  @Column({ length: 255, nullable: true })
  address: string | null; //地址

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  lat: number | null; //经度

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  lng: number | null; //纬度

  @Column({ type: 'text', nullable: true })
  description: string | null;

  // @OneToMany(() => DailyPlan, dp => dp.poi)
  // dailyPlan: DailyPlan[]; //一个地点存在多个日常计划中

  // @OneToMany(() => DailyPlanItem, (item) => item.poi)
  // dailyPlanItem: DailyPlanItem[];

  @OneToMany(() => UserFavorite, fav => fav.poi)
  favorite: UserFavorite[]; //一个地点被多个用户收藏
}
