import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/models/user/user.service';
import bcrypt from 'bcrypt';
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
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }


  async login(user: any) {
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
}
