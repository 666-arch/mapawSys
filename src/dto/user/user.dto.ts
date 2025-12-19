import { LoginDto } from "./login.dto";

export class UserDto extends LoginDto{
    id: number;
    accessToken: string;
    refreshToken: string;
    lastLoginTime: Date;
}