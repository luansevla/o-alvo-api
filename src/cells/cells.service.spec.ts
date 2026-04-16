import { Test, TestingModule } from '@nestjs/testing';
import { CellService } from './cells.service';

describe('CellsService', () => {
  let service: CellService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CellService],
    }).compile();

    service = module.get<CellService>(CellService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
