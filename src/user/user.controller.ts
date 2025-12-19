import { Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Post('/profile')
    getProfile() {
        return { message: 'User profile endpoint' }
    }
    
    @Post('/resetProfile')
    saveProfile() {
        return { message: 'User profile endpoint' }
    }
}
