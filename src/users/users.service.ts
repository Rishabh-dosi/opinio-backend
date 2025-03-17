import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt'; // Fix import
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private authService: AuthService
    ) { }

    async generateOTP(): Promise<string> {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async sendOTP(mobileNumber: string) {
        let user = await this.userRepository.findOne({ where: { mobileNumber } });

        if (!user) {
            user = this.userRepository.create({ mobileNumber });
            await this.userRepository.save(user);
        }

        const otp = await this.generateOTP();
        user.otp = otp;
        await this.userRepository.save(user);

        console.log(`OTP for ${mobileNumber}: ${otp}`); // Simulate sending OTP
        return { message: 'OTP sent successfully' };
    }

    async verifyOTP(mobileNumber: string, otp: string) {
        const user = await this.userRepository.findOne({ where: { mobileNumber } });

        if (!user || user.otp !== otp) {
            throw new UnauthorizedException('Invalid OTP');
        }

        user.isOtpVerified = true;
        user.otp = "";
        await this.userRepository.save(user);

        const token = this.authService.generateToken(user);
        return { message: 'Login successful', token };
    }

    async userLogin(data: Partial<User>): Promise<any> {
        const email = data.email;
        const password = data.password;

        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new UnauthorizedException('Invalid email');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new BadRequestException('Invalid email or password');
        }

        const token = this.authService.generateToken(user);

        return {
            token,
            user: { id: user.id, email: user.email, role: user.role }
        };
    }
    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id },
        });

        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async updateUser(id: number, data: Partial<User>) {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.userRepository.update(id, data);

        return this.userRepository.findOne({ where: { id } }); 
    }



}
