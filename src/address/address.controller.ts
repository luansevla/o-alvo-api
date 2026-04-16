import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@ApiTags('Addresses')
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Registra um novo endereço' })
  async create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar endereços com filtros (City, State, Neighborhood)',
  })
  async findAll(
    @Query('city') city?: string,
    @Query('state') state?: string,
    @Query('neighborhood') neighborhood?: string,
  ) {
    return this.addressService.findAll({ city, state, neighborhood });
  }

  @Get('cep/:cep')
  @ApiOperation({ summary: 'Busca endereços pelo CEP' })
  @ApiParam({ name: 'cep', description: 'CEP apenas números ou com hífen' })
  async findByCep(@Param('cep') cep: string) {
    return this.addressService.findByCep(cep);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um endereço existente' })
  @ApiParam({ name: 'id', description: 'ID do documento no MongoDB' })
  async update(
    @Param('id') id: string,
    @Body() updateAddressDto: Partial<CreateAddressDto>,
  ) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um endereço' })
  @ApiParam({ name: 'id', description: 'ID do documento no MongoDB' })
  async remove(@Param('id') id: string) {
    return this.addressService.remove(id);
  }
}
