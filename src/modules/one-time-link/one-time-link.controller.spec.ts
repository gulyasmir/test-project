import { Test, TestingModule } from '@nestjs/testing';
import { OneTimeLinkController } from './one-time-link.controller';
import { OneTimeLinkService } from './one-time-link.service';
import { OneTimeLink } from './entities/one-time-link.entity';
import { CreateOneTimeLinkDto } from './dto/create-one-time-link.dto';
import * as dotenv from 'dotenv';
import { InternalServerErrorException } from '@nestjs/common';

dotenv.config({ path: __dirname + '/.env' });
const url =
  process.env.HOST && process.env.PORT
    ? `http://${process.env.HOST}:${process.env.PORT}`
    : 'http://localhost:3000';

describe('OneTimeLinkController', () => {
  let controller: OneTimeLinkController;
  let service: OneTimeLinkService;
  let testString = Math.random().toString(36).substring(2, 10);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OneTimeLinkController],
      providers: [
        {
          provide: OneTimeLinkService,
          useValue: {
            createOneTimeLink: jest
              .fn()
              .mockReturnValue(new OneTimeLink(testString)),
            getOneTimeLink: jest
              .fn()
              .mockReturnValue(new OneTimeLink(testString)),
          },
        },
      ],
    }).compile();

    controller = module.get<OneTimeLinkController>(OneTimeLinkController);
    service = module.get<OneTimeLinkService>(OneTimeLinkService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new one-time link', () => {
    const data: CreateOneTimeLinkDto = { value: testString };
    const res = controller.createOneTimeLink(data);

    expect(service.createOneTimeLink).toHaveBeenCalledWith(data);
    expect(res).toBeInstanceOf(
      OneTimeLink || String || InternalServerErrorException,
    );
  });
});
