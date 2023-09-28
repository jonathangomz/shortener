import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { FindUrlDto } from './dto/find-url.dto';
import { JwtAuthGuard } from '../../services/auth/guards/jwt-guard';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('urls')
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('encode')
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create(createUrlDto.url);
  }

  @Get('decode')
  findOne(@Body() findUrlDto: FindUrlDto) {
    return this.urlService.findOne(findUrlDto.url);
  }
}
