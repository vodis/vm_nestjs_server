import { Injectable } from '@nestjs/common';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { UsersRulesService } from '../users-rules/users-rules.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly usersRulesService: UsersRulesService,
  ) {}

  async adminAuthorization(data: User): Promise<any> {
    const result = await this.authService.validateUser(
      data.email,
      data.password,
    );
    const user = await this.usersRulesService.findRulesById(result.id);
    if (!user.admin) {
      const usersRules = await this.usersRulesService.findAllRules();
      if (!usersRules.some(user => user.admin === true)) {
        this.initialApplyAdminRules(user.id);
      }
    }
  }

  private async initialApplyAdminRules(id) {
    const roles = {
      user: true,
      admin: true,
      guest: true,
    };
    return await this.usersRulesService.updateDefaultRules(id, roles, '__root__');
  }
}
