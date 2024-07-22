import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/.env' });
const url =
  process.env.HOST && process.env.PORT
    ? `http://${process.env.HOST}:${process.env.PORT}`
    : 'http://localhost:3000';

@Injectable()
export class AppService {
  getHello(): string {
    return `<h1 style="margin: 10%">Программа - генератор одноразовых ссылок. <hr><a href="${url}/api" target="_blank">Сваггер тут </a></h1>`;
  }
}
