import { Module } from '@nestjs/common';
import { UserService } from 'src/models/user/user.service';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/models/user/user.module';
import { User } from 'src/models/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({

       secret:jwtConstants.secret,
       signOptions: {expiresIn: '60s' }
    })
  ],
  providers: [AuthService, UserService, LocalStrategy,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
