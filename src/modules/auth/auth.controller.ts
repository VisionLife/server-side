import { Body, Controller, Post } from '@nestjs/common';
import { UserLogin } from '../user/models/dtos/login-user.req.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: UserLogin) {
    return this.authService.login(body.email, body.password);
  }
}
