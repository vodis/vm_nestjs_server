import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Put,
  Delete,
  Param,
  UseInterceptors,
  UseGuards,
  Query,
  Headers,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { UpdatePasswordDTO } from './dto/users.dto';

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
    return this.service.getUserById(params.id);
  }

  @Post()
  create(@Body() user: User) {
    return this.service.createUser(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('profile/:id')
  update(
    @Param('id') id: string,
    @Body() { oldPassword, newPassword, rePassword }: UpdatePasswordDTO,
  ) {
    return this.service.updatePassword(
      id,
      oldPassword,
      newPassword,
      rePassword,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param() params, @Headers() req) {
    return this.service.deleteUser(params.id, req.authorization);
  }
}
