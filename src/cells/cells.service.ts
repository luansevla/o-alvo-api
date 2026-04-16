import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCellDto } from './dto/create-cell.dto';
import { UpdateCellDto } from './dto/update-cell.dto';
import { Cell } from './schema/cells.schema';

@Injectable()
export class CellService {
  constructor(@InjectModel(Cell.name) private cellModel: Model<Cell>) {}

  async create(createCellDto: CreateCellDto): Promise<Cell> {
    const newCell = new this.cellModel(createCellDto);
    return await newCell.save();
  }

  async findAll(): Promise<Cell[]> {
    return await this.cellModel
      .find()
      .populate('lideres', 'nome contato')
      .populate('area', 'nome cidade')
      .populate('pastor_responsavel', 'nome')
      .exec();
  }

  async findOne(id: string): Promise<Cell> {
    const cell = await this.cellModel
      .findById(id)
      .populate('lideres colideres membros visitas pastor_responsavel area')
      .exec();

    if (!cell) throw new NotFoundException('Célula não encontrada');
    return cell;
  }

  async findByArea(areaId: string): Promise<Cell[]> {
    const validId = areaId.trim();
    const cells = await this.cellModel
      .find({ 'area': areaId })
      .exec();

    if (cells.length === 0) {
      throw new NotFoundException(
        `Células não encontradas para a área: ${validId}`,
      );
    }
    return cells;
  }

  async update(id: string, updateCellDto: UpdateCellDto): Promise<Cell> {
    const updatedCell = await this.cellModel
      .findByIdAndUpdate(id, updateCellDto, { new: true })
      .exec();

    if (!updatedCell) throw new NotFoundException('Célula não encontrada');
    return updatedCell;
  }

  async remove(id: string) {
    const result = await this.cellModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Célula não encontrada');
    return { deleted: true };
  }
}
