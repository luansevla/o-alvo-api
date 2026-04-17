import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Address, AddressSchema } from '../../address/schema/address.schema';
import { Area, AreaSchema } from '../../area/schema/area.schema';

@Schema({ timestamps: true })
export class Cell extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  horario: string; // Ex: "19:30"

  @Prop({ required: true })
  dia_semana: string; // Ex: "Quarta-feira"

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  lideres: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  colideres: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  pastor_responsavel: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  membros: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  visitas: Types.ObjectId[];

  @Prop({
    required: true,
    enum: ['Casais', 'Solteiros', 'Solteiras', 'Mista'],
  })
  tipo: string;

  @Prop({ type: AreaSchema, required: true })
  area: Area;

  @Prop({ type: AddressSchema, required: true })
  address: Address;

  @Prop({ default: true })
  ativa: boolean;

  @Prop({ required: true })
  link: string;
}

export const CellSchema = SchemaFactory.createForClass(Cell);
