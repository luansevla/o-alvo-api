import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCellDto } from './dto/create-cell.dto';
import { UpdateCellDto } from './dto/update-cell.dto';
import { CellService } from './cells.service';

@Controller('cells')
export class CellController {
  constructor(private readonly cellService: CellService) {}

  @Post()
  create(@Body() createCellDto: CreateCellDto) {
    return this.cellService.create(createCellDto);
  }

  @Get()
  findAll() {
    return this.cellService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cellService.findOne(id);
  }

  @Get('findCellsByArea/:areaId')
  findByArea(@Param('areaId') areaId: string) {
    return this.cellService.findByArea(areaId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCellDto: UpdateCellDto) {
    return this.cellService.update(id, updateCellDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cellService.remove(id);
  }
}
