import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Area } from './schema/area.schema';

@Injectable()
export class AreaService {
  constructor(@InjectModel(Area.name) private areaModel: Model<Area>) {}

  // Criar uma nova área
  async create(createAreaDto: CreateAreaDto): Promise<Area> {
    try {
      const newArea = new this.areaModel(createAreaDto);
      return await newArea.save();
    } catch (error) {
      throw new BadRequestException('Erro ao criar área. Verifique os dados.');
    }
  }

  // Listar todas as áreas com os dados dos pastores "populados"
  async findAll(): Promise<Area[]> {
    return await this.areaModel
      .find()
      .populate('pastores_gestores', 'nome email contato') // Busca os dados reais na coleção de Users
      .sort({ nome: 1 }) // Ordem alfabética
      .exec();
  }

  // Buscar uma área específica por ID
  async findOne(id: string): Promise<Area> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID da área inválido.');
    }

    const area = await this.areaModel
      .findById(id)
      .populate('pastores_gestores')
      .exec();

    if (!area) {
      throw new NotFoundException(`Área com ID ${id} não encontrada.`);
    }
    return area;
  }

  // Atualizar dados da área ou a lista de pastores
  async update(id: string, updateAreaDto: UpdateAreaDto): Promise<Area> {
    const updatedArea = await this.areaModel
      .findByIdAndUpdate(id, updateAreaDto, { new: true }) // new: true retorna o objeto já atualizado
      .populate('pastores_gestores')
      .exec();

    if (!updatedArea) {
      throw new NotFoundException(`Área com ID ${id} não encontrada.`);
    }
    return updatedArea;
  }

  // Deletar área
  async remove(id: string) {
    const result = await this.areaModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Área com ID ${id} não encontrada.`);
    }
    return { message: 'Área removida com sucesso' };
  }

  async addPastorToArea(areaId: string, pastorId: string): Promise<Area> {
    return (await this.areaModel
      .findByIdAndUpdate(
        areaId,
        { $addToSet: { pastores_gestores: pastorId } },
        { new: true },
      )
      .populate('pastores_gestores')
      .exec()) as Area;
  }
}
