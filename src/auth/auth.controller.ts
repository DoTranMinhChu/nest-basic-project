import { Controller, Post, UseGuards, Request, Get , Response } from '@nestjs/common';
import { User } from 'src/models/user/entities/user.entity';
import { UserService } from 'src/models/user/user.service';
import { AuthService } from './auth.service';
import { AuthenticationGuard } from './guards/auth.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthenticationGuard)
    @Get('profile')
    async getUserLoggedIn(@Request() request): Promise<User> {
        return this.userService.findOne(request.user.id);
    }

    @Get('login')
    async check() {
        return 'check';
    }

    @UseGuards(AuthenticationGuard)
    @Post('/logout')
    async getUserLogout(@Response() response): Promise<Response> {

        response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
        response.clearCookie('access_token');
        response.clearCookie('token');

        return response.sendStatus(200);
    }
}
