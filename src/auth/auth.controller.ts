import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';

import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return req.user;
    }

    @Get('login')
    async check() {
        return 'check';
    }
}
