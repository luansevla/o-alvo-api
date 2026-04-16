import { Test, TestingModule } from '@nestjs/testing';
import { CellController } from './cells.controller';
import { CellService } from './cells.service';

describe('CellsController', () => {
  let controller: CellController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CellController],
      providers: [CellService],
    }).compile();

    controller = module.get<CellController>(CellController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
