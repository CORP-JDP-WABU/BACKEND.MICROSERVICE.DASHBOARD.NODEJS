import { Controller, Get, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import * as dto from 'src/common/dto';

@Controller('dashboard/v1.0')
export class DashboardController {
  
    constructor(
        private readonly dashboardService: DashboardService
    ) {}

  @Get('university/:idUniversity/student/:idStudent')
  findDashboard(
    @Param('idUniversity') idUniversity: string,
    @Param('idStudent') idStudent: string
  ): Promise<dto.ResponseGenericDto> {
    return this.dashboardService.dashboardByUniversityAndStudent(idUniversity, idStudent);
  }
}
