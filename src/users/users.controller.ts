import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('api/users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post('send-otp')
    async sendOTP(@Body('mobileNumber') mobileNumber: string) {
        return this.userService.sendOTP(mobileNumber);
    }

    @Post('verify-otp')
    async verifyOTP(@Body('mobileNumber') mobileNumber: string, @Body('otp') otp: string) {
        return this.userService.verifyOTP(mobileNumber, otp);
    }

    @Post('login')
    async userLogin(@Body() data: { email: string, password: string }) {

        console.log(data, 2345);
        return this.userService.userLogin(data);
    }

    @Put(':id')
    async updateUser(@Body() data: Partial<User>, @Param('id') id: number) {
        return this.userService.updateUser(id, data);
    }
}
