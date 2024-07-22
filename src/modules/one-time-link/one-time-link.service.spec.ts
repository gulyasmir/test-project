import { Test, TestingModule } from '@nestjs/testing';
import { OneTimeLinkService } from './one-time-link.service';
import { CreateOneTimeLinkDto } from './dto/create-one-time-link.dto';

describe('OneTimeLinkService', () => {
  let service: OneTimeLinkService;
  let testString = Math.random().toString(36).substring(2, 14);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OneTimeLinkService],
    }).compile();

    service = module.get<OneTimeLinkService>(OneTimeLinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new one-time link', () => {
    const data: CreateOneTimeLinkDto = { value: testString };
    const link = service.fullOneTimeLink(data);

    expect(link).toBeDefined();
    expect(link.value).toBe(data.value);
    expect(link.isActive).toBe(true);
  });

  it('should get an active one-time link', () => {
    const data: CreateOneTimeLinkDto = { value: testString };
    const link = service.fullOneTimeLink(data);
    const fetchedLink = service.getOneTimeLink(link.id);
    expect(fetchedLink).toBe(data.value);
  });

  it('should return undefined for an inactive or non-existent link', () => {
    const link = service.getOneTimeLink('non-existent-id');
    expect(link).toBe('Данная ссылки не существует.');
  });
});
