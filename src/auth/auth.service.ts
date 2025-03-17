import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }
    generateToken(user: User): string {
        const payload = { email: user.email, sub: user.id }; // 'sub' can be user ID or any identifier
        return this.jwtService.sign(payload); // sign() method generates the token
    }
}
