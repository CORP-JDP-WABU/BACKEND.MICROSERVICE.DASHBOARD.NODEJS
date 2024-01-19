import { ApiProperty } from '@nestjs/swagger';
import * as dto from 'src/dto';

export class ResponseGenericDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  operation: string;

  @ApiProperty()
  data: dto.ResponseDashboardStudentDto;
}
