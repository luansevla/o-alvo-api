// src/address/address.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './schema/address.schema';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>,
  ) {}

  // Criar um novo endereço
  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const createdAddress = new this.addressModel(createAddressDto);
    return createdAddress.save();
  }

  // Buscar todos com filtros opcionais (City, State, Neighborhood)
  async findAll(filters: {
    city?: string;
    state?: string;
    neighborhood?: string;
  }): Promise<Address[]> {
    const query: any = {};

    if (filters.city) {
      query.city = { $regex: filters.city, $options: 'i' };
    }
    if (filters.state) {
      query.state = filters.state.toUpperCase();
    }
    if (filters.neighborhood) {
      query.neighborhood = { $regex: filters.neighborhood, $options: 'i' };
    }

    return this.addressModel.find(query).exec();
  }

  // Buscar por CEP específico
  async findByCep(cep: string): Promise<Address[]> {
    // Remove hífens caso o usuário envie 89010-025
    const cleanCep = cep.replace(/\D/g, '');
    const addresses = await this.addressModel.find({ cep: cleanCep }).exec();

    if (!addresses || addresses.length === 0) {
      throw new NotFoundException(
        `Nenhum endereço encontrado para o CEP: ${cep}`,
      );
    }
    return addresses;
  }

  // Atualizar endereço (Partial permite enviar apenas alguns campos)
  async update(
    id: string,
    updateAddressDto: Partial<CreateAddressDto>,
  ): Promise<Address> {
    const updatedAddress = await this.addressModel
      .findByIdAndUpdate(id, updateAddressDto, { new: true }) // new: true retorna o objeto já atualizado
      .exec();

    if (!updatedAddress) {
      throw new NotFoundException(
        `Endereço com ID ${id} não encontrado para atualização.`,
      );
    }
    return updatedAddress;
  }

  // Deletar endereço
  async remove(id: string): Promise<{ message: string }> {
    const result = await this.addressModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(
        `Endereço com ID ${id} não encontrado para exclusão.`,
      );
    }
    return { message: 'Endereço removido com sucesso.' };
  }
}
