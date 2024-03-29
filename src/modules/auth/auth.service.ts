import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from '../user/models/entities/user.entity';
import { UserService } from '../user/usecase/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  /**
   * login
   *
   * @param username string
   * @param password string
   * @returns Promise<object>
   */
  async login(username: string, password: string): Promise<object> {
    const user = await this.validateUser(username, password);
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      domain: user.domain,
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });

    return {
      access_token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        domain: user.domain,
        role: user.role,
        isActive: user.isActive,
      },
    };
  }

  /**
   * validateUser
   *
   * @param username string
   * @param password string
   * @returns Promise<User>
   */
  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isValid = compareSync(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if(!user.isActive) {
      throw new UnauthorizedException('User is disabled!');
    }

    return user;
  }
}
