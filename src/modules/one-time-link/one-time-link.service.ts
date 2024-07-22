import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OneTimeLink } from './entities/one-time-link.entity';
import { CreateOneTimeLinkDto } from './dto/create-one-time-link.dto';
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/.env' });
const url =
  process.env.HOST && process.env.PORT
    ? `http://${process.env.HOST}:${process.env.PORT}`
    : 'http://localhost:3000';

@Injectable()
export class OneTimeLinkService {
  private links: OneTimeLink[] = [];

  fullOneTimeLink(data: CreateOneTimeLinkDto): OneTimeLink {
    const link = new OneTimeLink(data.value);
    this.links.push(link);
    return link;
  }

  createOneTimeLink(data: CreateOneTimeLinkDto): String {
    const fullLink = this.fullOneTimeLink(data);
    return `${url}/one-time-links/${fullLink.id}`;
  }

  getOneTimeLink(id: string): String | Promise<InternalServerErrorException> {
    const link = this.links.find((l) => l.id === id);
    if (link && link.isActive) {
      link.deactivate();
      return link.value;
    }
    throw new InternalServerErrorException('Данная ссылка уже неактивна.');
  }
}
