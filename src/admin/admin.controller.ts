import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { User } from '../users/users.entity';
import { AdminDTO } from './dto/admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private service: AdminService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getCredentials(@Headers() { authorization }: AdminDTO) {
    return this.service.isAdmin(authorization);
  }
}
