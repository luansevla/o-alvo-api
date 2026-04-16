import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { decrypt, encrypt } from '../utils/crypto.util';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  private readonly saltRounds = 10;
  private user: User;
  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(
      'DTO recebido no Service:',
      JSON.stringify(createUserDto, null, 2),
    );

    const { address, document, ...rest } = createUserDto;
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const encryptedData = {
      ...rest,
      document: encrypt(document),
      password: hashedPassword,
      address: {
        ...address,
        cep: encrypt(address!.cep),
        state: encrypt(address!.state),
        city: encrypt(address!.city),
        neighborhood: encrypt(address!.neighborhood),
        street: encrypt(address!.street),
      },
    };
    console.log(createUserDto.address);
    const newUser = new this.userModel(encryptedData);
    return newUser.save();
  }

  async findAll() {
    return this.userModel.find().populate('cells.cellId').exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateData: any) {
    const updated = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Usuário não encontrado');
    return updated;
  }

  async remove(id: string) {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Usuário não encontrado');
    return { message: 'Usuário removido com sucesso' };
  }
}
