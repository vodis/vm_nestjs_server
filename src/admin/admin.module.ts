import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { UsersRulesModule } from '../users-rules/users-rules.module';

@Module({
  imports: [UsersModule, AuthModule, UsersRulesModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
