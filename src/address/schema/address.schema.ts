// src/address/schemas/address.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Address extends Document {
  @Prop({ required: true })
  cep: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  neighborhood: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  detail: string;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  location: {
    type: string;
    coordinates: number[];
  };
}

export const AddressSchema = SchemaFactory.createForClass(Address);
