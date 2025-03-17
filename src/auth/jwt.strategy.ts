import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service'; // Import UsersService

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET, // Ensure this is set
        });
    }

    async validate(payload: any) {
        // You can now use this.usersService in JwtStrategy to fetch user information
        const user = await this.usersService.findById(payload.sub); // Example of using UsersService
        if (!user) {
            throw new Error('User not found');
        }
        return user; // Return user or any other data you want to associate with the request
    }
}
