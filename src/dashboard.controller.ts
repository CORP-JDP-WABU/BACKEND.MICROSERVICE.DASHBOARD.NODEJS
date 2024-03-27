import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import * as dto from 'src/common/dto';
import { ThrottlerGuard } from '@nestjs/throttler';
import { SecurityGuard } from './common/guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserDecoratorInterface } from './common/interfaces';
import { UserDecorator } from './common/decorator';


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


  @Get('rendering-html')
  renderingHtml(
  ): String {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hola Mundo</title>
    </head>
    <body>
    <img src="https://wabu-development.s3.amazonaws.com/university/universidadperuanadecienciasaplicadas/course/quimica/trabajosfinales/Caso+05_Soluciones+para+tratamiento+de+agua+contaminada+(1).docx" alt="Imagen desde S3">
    </body>
    </html>`;
  }
}
