import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tb_city' })
export class City {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

}