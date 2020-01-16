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

  async adminAuthorization(user: User): Promise<any> {
    const result = await this.authService.validateUser(
      user.email,
      user.password,
    );
    const { admin } = await this.usersRulesService.findRulesById(result.id);
    if (!admin) {
      console.log('functionWithInitialLogin');
    }
  }
}
