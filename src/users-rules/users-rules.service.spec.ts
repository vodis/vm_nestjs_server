import { Test, TestingModule } from '@nestjs/testing';
import { UsersRulesService } from './users-rules.service';

describe('UsersRulesService', () => {
  let service: UsersRulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersRulesService],
    }).compile();

    service = module.get<UsersRulesService>(UsersRulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
