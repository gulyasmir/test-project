import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { OneTimeLinkService } from './one-time-link.service';
import { CreateOneTimeLinkDto } from './dto/create-one-time-link.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Генератор одноразовых ссылок')
@Controller('one-time-links')
export class OneTimeLinkController {
  constructor(private oneTimeLinkService: OneTimeLinkService) {}

  @Post()
  createOneTimeLink(@Body() data: CreateOneTimeLinkDto): String {
    return this.oneTimeLinkService.createOneTimeLink(data);
  }

  @Get(':id')
  getOneTimeLink(
    @Param('id') id: string,
  ): String | Promise<InternalServerErrorException> {
    const link = this.oneTimeLinkService.getOneTimeLink(id);
    return link;
  }
}
