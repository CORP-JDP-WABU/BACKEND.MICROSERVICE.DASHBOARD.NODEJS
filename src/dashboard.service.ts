import { Injectable, Logger } from '@nestjs/common';
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
  ): Promise<dto.ResponseGenericDto> {
    this.logger.debug(
      `::dashboardByUniversityAndStudent::params::${idUniversity}-${idStudent}`,
    );

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
      throw new exception.NotExistStudentRecoveryCustomException();
    }

    if (!university) {
      throw new exception.NotExistUniversityRegisterCustomException();
    }

    const dashboard = await this.dashboardModel.findOne({ 
        "university._id": mongoose.Types.ObjectId(idUniversity),
        "students._id": mongoose.Types.ObjectId(idStudent)
    });

    if(!dashboard)
        throw new exception.NotExistDashboardCustomException();

    const studentDashboard = dashboard.students.find(student => student._id.toString() == idStudent);

    const favoriteCourses = studentDashboard.favoriteCourses

    return <dto.ResponseGenericDto>{
        message: 'Processo exitoso',
        operation: `::${DashboardService.name}::execute`,
        data: <dashDto.ResponseDashboardStudentDto> {
            university: dashboard.university.name,
            kpis: {
                ...dashboard.kpis
            },
            student: {
                idStudent: studentDashboard._id.toString(),
                points: studentDashboard.points,
                favoriteCourses: favoriteCourses.map(course => {
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
