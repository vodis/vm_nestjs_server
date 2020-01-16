import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { User } from '../users/users.entity';

@Controller('admin')
export class AdminController {
  constructor(private service: AdminService) {}

  @Post()
  create(@Body() user: User) {
    return this.service.adminAuthorization(user);
  }
}
