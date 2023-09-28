import { PartialType } from '@nestjs/mapped-types';
import { CreateUrlDto } from './create-url.dto';

export class FindUrlDto extends PartialType(CreateUrlDto) {}
