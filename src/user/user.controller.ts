import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get('/profile')
    getProfile() {
        return { message: 'User profile endpoint' }
    }
}
