import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersRulesModule } from 'src/users-rules/users-rules.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersRulesModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
