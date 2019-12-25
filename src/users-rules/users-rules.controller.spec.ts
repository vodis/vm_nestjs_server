import { Test, TestingModule } from '@nestjs/testing';
import { UsersRulesController } from './users-rules.controller';

describe('UsersRules Controller', () => {
  let controller: UsersRulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersRulesController],
    }).compile();

    controller = module.get<UsersRulesController>(UsersRulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
