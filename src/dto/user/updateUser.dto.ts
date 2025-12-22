import { GenderType } from 'src/entity/user.entity';

export class UpdateUserDto {
  id: number;
  username: string;
  email: string;
  gender: GenderType;
  avatar: string;
  updateAt: Date;
}
