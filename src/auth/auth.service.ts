import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserI } from 'src/users/interfaces/user-interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<UserI> {
    try {
      const user: UserI = await this.usersService.findOne(username);
      if (user && user.password === password) {
        const { password, ...result } = user;
        password;
        result;
        return user;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async login(user: any): Promise<{
    access_token: string;
  }> {
    try {
      const payload = {
        sub: user._doc._id,
        username: user._doc.username,
        password: user._doc.password,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.log(error);
    }
  }
}
