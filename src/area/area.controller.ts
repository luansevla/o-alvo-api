import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Controller('areas')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  // Criar uma nova área
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAreaDto: CreateAreaDto) {
    return await this.areaService.create(createAreaDto);
  }

  // Listar todas as áreas (já vem com pastores populados pelo service)
  @Get()
  async findAll() {
    return await this.areaService.findAll();
  }

  // Buscar uma área específica
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.areaService.findOne(id);
  }

  // Atualizar dados de uma área (nome, cidade ou lista de pastores)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAreaDto: UpdateAreaDto) {
    return await this.areaService.update(id, updateAreaDto);
  }

  // Remover uma área
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 se deletar com sucesso
  async remove(@Param('id') id: string) {
    return await this.areaService.remove(id);
  }

  // Rota extra para adicionar um pastor sem precisar enviar a lista toda no Patch
  @Patch(':id/adicionar-pastor/:pastorId')
  async addPastor(
    @Param('id') id: string,
    @Param('pastorId') pastorId: string,
  ) {
    return await this.areaService.addPastorToArea(id, pastorId);
  }
}
