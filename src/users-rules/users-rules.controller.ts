import { Controller, Get } from '@nestjs/common';
import { UsersRules } from './users-rule.entity';
import { UsersRulesService } from './users-rules.service';

@Controller('users-rules')
export class UsersRulesController {
  constructor(private usersRulesService: UsersRulesService) {}

  @Get()
  getAll(): Promise<UsersRules[]> {
    return this.usersRulesService.findAllRules();
  }
}
