import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRules } from './users-rule.entity';

@Injectable()
export class UsersRulesService {
  constructor(
    @InjectRepository(UsersRules)
    private usersRulesRepository: Repository<UsersRules>,
  ) {}

  async findAllRules() {
    return await this.usersRulesRepository.find({
      select: ['id', 'user', 'admin', 'guest', 'create_at', 'update_at'],
    });
  }

  async findRulesById(_id: string): Promise<UsersRules> {
    return await this.usersRulesRepository.findOne({
      select: [
        'id',
        'user',
        'admin',
        'guest',
        'create_at',
        'update_at',
        'voucher_id',
      ],
      where: [{ id: _id }],
    });
  }

  async createDefaultRules(id: string): Promise<UsersRules> {
    const userRules = {
      id,
      user: true,
      admin: false,
      guest: false,
      create_at: new Date(),
      update_at: new Date(),
      voucher_id: '',
    };
    return await this.usersRulesRepository.save(userRules);
  }
}
