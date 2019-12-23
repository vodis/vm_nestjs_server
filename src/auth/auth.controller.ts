import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Query() params: LoginDTO) {
    return this.authService.login(params.email, params.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile() {
    return {
      profile: 'dummy data',
    };
  }
}
