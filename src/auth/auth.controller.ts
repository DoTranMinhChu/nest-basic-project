import { Controller, Post, UseGuards, Request, Get, Response, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/models/user/dto/create-user.dto';
import { User } from 'src/models/user/entities/user.entity';
import { UserService } from 'src/models/user/user.service';
import { AuthService } from './auth.service';
import { AuthenticationGuard } from './guards/auth.guard';
import { LocalAuthGuard } from './guards/local.guard';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() request): Promise<any> {
        console.log("req :", request);
        return this.authService.login(request.user);
    }

    @Post('register')
    async register(@Body() user: CreateUserDto) {
        return this.authService.register(user);
    }

    @UseGuards(AuthenticationGuard)
    @Get('profile')
    async getUserLoggedIn(@Request() request): Promise<any> {
        const user = await this.userService.findOne(request.user.id);
        const { password, ...result } = user;
        return result;
    }


    @UseGuards(AuthenticationGuard)
    @Post('logout')
    async getUserLogout(@Response() response): Promise<Response> {

        response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
        response.clearCookie('access_token');
        response.clearCookie('token');

        return response.sendStatus(200);
    }
}
