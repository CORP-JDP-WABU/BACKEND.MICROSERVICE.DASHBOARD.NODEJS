import { ApiProperty } from "@nestjs/swagger";

class DashboardKpi {
    @ApiProperty()
    manyStudentConnected: number

    @ApiProperty()
    manyQualificationTeacher: number

    @ApiProperty()
    manySharedDocument: number
}

class DashboardStudentFavoriteCourses {
    @ApiProperty()
    idCourse: string

    @ApiProperty()
    name: string
}

class DashboardStudent {
    @ApiProperty()
    idStudent: string

    @ApiProperty()
    points: number

    @ApiProperty({ type: [DashboardStudentFavoriteCourses], isArray: true })
    favoriteCourses: DashboardStudentFavoriteCourses[];
}

export class ResponseDashboardStudentDto {
    @ApiProperty()
    university: string

    @ApiProperty({ type: DashboardKpi, isArray: false })
    kpis: DashboardKpi
    
    @ApiProperty({ type: DashboardStudent, isArray: false })
    student: DashboardStudent

}