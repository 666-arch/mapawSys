import { LoginDto } from "./login.dto";

export class UserDto extends LoginDto{
    id: number;
    accessToken: string;
    refreshToken: string;
    lastLoginTime: Date;
    createAt: Date; //创建时间
    updateAt: Date; //修改时间
}