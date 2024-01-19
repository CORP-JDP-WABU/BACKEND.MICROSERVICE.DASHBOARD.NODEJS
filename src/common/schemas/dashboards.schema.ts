import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AuditPropertiesSchema } from './audit-properties.schema';

export type DashboardsDocument = Dashboards & mongoose.Document;

@Schema({ collection: 'Dashboards', autoIndex: true })
export class Dashboards {
  @Prop(
    raw({
      idUniversity: mongoose.Types.ObjectId,
      name: String,
    }),
  )
  university: string;

  @Prop(
    raw({
      manyStudentConnected: Number,
      manyQualificationTeacher: Number,
      manySharedDocument: Number,
    }),
  )
  kpis: {
    manyStudentConnected: number;
    manyQualificationTeacher: number;
    manySharedDocument: number;
  };

  @Prop(
    raw({
      type: [
        {
          idStudent: mongoose.Types.ObjectId,
          profilePicture: String,
          fullName: String,
          points: Number,
          favoriteCourses: [
            {
              idCourse: mongoose.Types.ObjectId,
              name: String,
            },
          ],
        },
      ],
    }),
  )
  students: {
    idStudent: mongoose.Types.ObjectId;
    profilePicture: string;
    fullName: string;
    points: number;
    favoriteCourses: {
      idCourse: mongoose.Types.ObjectId;
      name: string;
    }[];
  }[];

  @Prop({
    type: AuditPropertiesSchema,
    default: () => new AuditPropertiesSchema(),
  })
  auditProperties: AuditPropertiesSchema;
}

export const DashboardsSchema = SchemaFactory.createForClass(Dashboards);
