import { PartialType } from '@nestjs/swagger';
import { CreateUrlDto } from './create-url.dto';

export class FindUrlDto extends PartialType(CreateUrlDto) {}
