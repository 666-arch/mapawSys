import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/dto/user/register.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ){}
    /**
     * register
     */
    async RegisterUser(user: RegisterUserDto) {
        if (!user) throw new Error('错误调用，数据对象为空');
        const newUser = this.userRepo.create(user);
        return await this.userRepo.save(newUser);
    }
}
