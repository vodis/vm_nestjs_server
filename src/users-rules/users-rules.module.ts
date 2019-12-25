import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRulesController } from './users-rules.controller';
import { UsersRulesService } from './users-rules.service';
import { UsersRules } from './users-rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRules])],
  controllers: [UsersRulesController],
  providers: [UsersRulesService],
  exports: [UsersRulesService],
})
export class UsersRulesModule {}
