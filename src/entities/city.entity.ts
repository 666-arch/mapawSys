import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'city' })
export class City {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    
}