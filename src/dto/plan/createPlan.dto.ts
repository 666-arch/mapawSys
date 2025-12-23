import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { TravelType } from "src/entity/plan.entity";

export class CreatePlanDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsInt()
    days: number;

    @IsEnum(['COUPLE', 'FAMILY', 'SOLO'])
    travelType: TravelType;

    @IsInt()
    budget: number;

    @IsString()
    startTime: string;

    @IsString()
    endTime: string;

    @IsInt()
    cityId: number;
}