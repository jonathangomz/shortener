import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUrl } from "class-validator";

export class CreateUrlDto {
  @ApiProperty()
  @IsUrl()
  url: string;
}
