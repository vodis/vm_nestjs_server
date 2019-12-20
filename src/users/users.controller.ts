import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  @UseInterceptors(new LoggingInterceptor())
  findAll(): Promise<User[]> {
    return this.service.getUsers();
  }

  @Get(':id')
  get(@Param() params) {
    return this.service.getUser(params.id);
  }

  @Post()
  create(@Body() user: User) {
    return this.service.createUser(user);
  }

  @Put()
  update(@Body() user: User) {
    return this.service.updateUser(user);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.deleteUser(params.id);
  }

  @Post('login')
  login(@Body() user: User) {
    return this.service.findByCredentials(user.email, user.password);
  }
}
