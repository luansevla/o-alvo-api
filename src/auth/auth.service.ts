import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string; email: string; name: string }> {
    const user = await this.userService.findByEmail(email);
    const isMatch = await bcrypt.compare(pass, user!.password);
    if (isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user!.name, email: user!.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      email: email,
      name: user!.name,
    };
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }
}
