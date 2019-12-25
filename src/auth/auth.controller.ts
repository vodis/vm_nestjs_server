import {
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from 'src/users/users.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Query() user: User) {
    return this.authService.validateUser(user.email, user.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('logout')
  async getProfile(@Query() user: User, @Headers() req) {
    return this.authService.logoutUser(user.id, req.authorization);
  }
}
