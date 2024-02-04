import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import * as dto from 'src/common/dto';
import { ThrottlerGuard } from '@nestjs/throttler';
import { SecurityGuard } from './common/guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserDecoratorInterface } from './common/interfaces';
import { UserDecorator } from './common/decorator';

@ApiBearerAuth()
@UseGuards(SecurityGuard, ThrottlerGuard)
@Controller('dashboard/v1.0')
export class DashboardController {
  
    constructor(
        private readonly dashboardService: DashboardService
    ) {}

  @Get('university/:idUniversity/student/:idStudent')
  findDashboard(
    @Param('idUniversity') idUniversity: string,
    @Param('idStudent') idStudent: string,
    @UserDecorator() userDecorator: UserDecoratorInterface,
  ): Promise<dto.ResponseGenericDto> {
    return this.dashboardService.dashboardByUniversityAndStudent(idUniversity, idStudent, userDecorator);
  }
}
