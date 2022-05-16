import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/models/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/models/user/dto/create-user.dto';
import { UserDto } from 'src/models/user/dto/user.dto';
import { LoginUserDto } from 'src/models/user/dto/login-user.dto';
import { User } from 'src/models/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async hashPasswrod(password: string): Promise<string> {
    const saltOrRounds = 12;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findUser(username);
    const check = await this.comparePassword(pass, user.password);

    if (user && check) {
      const { password, ...result } = user;
      return result;
    }
    return null
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  async comparePassword(
    password: string,
    storePasswordHash: string,
  ): Promise<any> {
    return await bcrypt.compare(password, storePasswordHash);
  }


  async login(user: User) {
    const payload = {
      name: user.name,
      email: user.email,
      id: user.id,
    };

    return {
      token: this.jwtService.sign(payload),
      user,
    };


  }



  async register(user: CreateUserDto) {
    console.log("resgister : ", user)
    const isUserExist = await this.isUserExist(user.email);
    console.log("Check : ", isUserExist)
    if (isUserExist) {
      throw new HttpException(
        { message: 'User already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }
    user.password = await this.hashPasswrod(user.password);
    return this.userService.create(user);


  }

  async isUserExist(username: string): Promise<boolean> {
    const user = await this.userService.findUser(username);
    if (user !== null) {
      return true;
    } else {
      return false;
    }
  }
}
