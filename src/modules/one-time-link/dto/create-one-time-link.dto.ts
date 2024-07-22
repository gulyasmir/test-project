import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOneTimeLinkDto {
  @ApiPropertyOptional({
    description: 'Произвольная строка',
    example: 'qazxswedcvfr',
  })
  value: string;
}
