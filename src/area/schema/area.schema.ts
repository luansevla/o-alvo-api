import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Area extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  cidade: string;

  @Prop({ type: [{ type: [String], ref: 'User' }] })
  pastores_gestores: String[];
}

export const AreaSchema = SchemaFactory.createForClass(Area);
