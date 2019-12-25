import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Patch,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): Object {
    return this.appService.root();
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  update(@Body() id: string) {
    return this.appService.updateToken(id);
  }
}
