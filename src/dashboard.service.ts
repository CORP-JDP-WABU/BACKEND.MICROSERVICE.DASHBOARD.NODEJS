import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as schemas from 'src/common/schemas';
import * as dto from 'src/common/dto';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as exception from 'src/exception';
import * as dashDto from './dto';

@Injectable()
export class DashboardService {
  private logger = new Logger(DashboardService.name);

  constructor(
    @InjectModel(schemas.Dashboards.name)
    private readonly dashboardModel: mongoose.Model<schemas.DashboardsDocument>,
    @InjectModel(schemas.Universities.name)
    private readonly universityModel: mongoose.Model<schemas.UniversitiesDocument>,
    @InjectModel(schemas.Students.name)
    private readonly studentModel: mongoose.Model<schemas.StudentsDocument>,
  ) {}

  async dashboardByUniversityAndStudent(
    idUniversity: string,
    idStudent: string,
    userDecorator: any
  ): Promise<dto.ResponseGenericDto> {
    this.logger.debug(
      `::dashboardByUniversityAndStudent::params::${idUniversity}-${idStudent}`,
    );

    if (idStudent !== userDecorator.idStudent) {
      throw new UnauthorizedException();
    }

    const studentPromise = this.studentModel.findOne({
      _id: mongoose.Types.ObjectId(idStudent),
    });
    const universityPromise = this.universityModel.findOne({
      _id: mongoose.Types.ObjectId(idUniversity),
    });

    const [student, university] = await Promise.all([
      studentPromise,
      universityPromise,
    ]);

    if (!student) {
      throw new exception.NotExistStudentRegisterCustomException('DASHBOARD_NOT_EXITS_STUDENT');
    }

    if (!university) {
      throw new exception.NotExistUniversityRegisterCustomException('DASHBOARD_NOT_EXITS_UNIVERSITY');
    }

    const dashboard = await this.dashboardModel.findOne({ 
        "university._id": mongoose.Types.ObjectId(idUniversity),
        "students._id": mongoose.Types.ObjectId(idStudent)
    });

    if(!dashboard)
        throw new exception.NotExistDashboardCustomException('DASHBOARD_NOT_EXITS');

    const { students } = dashboard;


    this.logger.debug(`::dashboard::${JSON.stringify(dashboard)}`);

    return <dto.ResponseGenericDto>{
        message: 'Processo exitoso',
        operation: `::${DashboardService.name}::execute`,
        data: <dashDto.ResponseDashboardStudentDto> {
            university: dashboard.university.name,
            kpis: {
                ...dashboard.kpis
            },
            student: {
                idStudent: students._id.toString(),
                points: students.points,
                favoriteCourses: students.favoriteCourses.map(course => {
                    return {
                        idCourse: course._id.toString(),
                        name: course.name
                    }
                })
            }
        }
    };
  }
}
