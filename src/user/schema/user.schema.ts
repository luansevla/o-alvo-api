import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { decrypt, encrypt } from '../../utils/crypto.util';
import { Address, AddressSchema } from '../../address/schema/address.schema';
import { Cell } from '../../cells/schema/cells.schema';
import * as mongoose from 'mongoose';

@Schema()
class UserCell {
  @Prop({ type: Types.ObjectId, ref: 'Cell', required: true })
  cellId: Types.ObjectId;

  @Prop({
    type: String,
    enum: ['leader', 'supervisor', 'member'],
    default: 'member',
  })
  role: string;
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    unique: true,
    get: (val: string) => (val ? decrypt(val) : val),
  })
  document: string;

  @Prop()
  birthDate: Date;

  @Prop()
  contactPhone: string;

  @Prop()
  department: string;

  @Prop([
    {
      cellId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cell' }, // O nome aqui DEVE ser cellId
      role: { type: String },
    },
  ])
  cells: Cell[];

  @Prop({ type: AddressSchema, required: true })
  address: Address;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({
    type: String,
    enum: [
      'ADMIN',
      'PASTOR',
      'DIÁCONO',
      'SUPERVISOR',
      'COLIDER',
      'ASP. DIÁCONO',
      'LIDER',
      'MEMBRO',
    ],
    default: 'MEMBRO',
  })
  accessLevel: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
