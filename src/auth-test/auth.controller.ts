import { Controller, Get, UseGuards, Post, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('auth/login')
  async login(@Param() params) {
    console.log();
    return this.authService.validateUser(params.email, params.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Param() params) {
    console.log(params.url);
    return params.user;
  }
}
