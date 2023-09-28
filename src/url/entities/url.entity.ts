import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UrlDocument = HydratedDocument<Url>;

@Schema()
export class Url {
  @Prop({required: true})
  url: string;

  @Prop({required: true})
  shortenedUrl: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url)