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

  async isAdmin(authorization: string): Promise<{}> {
    const { id } = await this.usersService.readTokenPayload(authorization);
    const { guest, user, admin } = await this.usersRulesService.findRulesById(id);
    return {
      guest,
      user,
      admin
    };
  }
}
