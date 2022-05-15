import { Module } from '@nestjs/common';
import { UserService } from 'src/models/user/user.service';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/models/user/user.module';
import { User } from 'src/models/user/entities/user.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User]),PassportModule],
  providers: [AuthService,UserService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
