import { Module } from '@nestjs/common';
import { CellService } from './cells.service';
import { CellController } from './cells.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cell, CellSchema } from './schema/cells.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cell.name, schema: CellSchema }]),
  ],
  controllers: [CellController],
  providers: [CellService],
})
export class CellsModule {}
