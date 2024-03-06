import { Injectable } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Injectable()
export class ReceivingService {
  constructor(private readonly client: ClientProxy) {}

  @EventPattern('university_kpi_increment_student_connected')
  receivedEvenToUniversityKpiIncrementStudentConnected(data: any) {
    console.log('Event received:', data);
  }
}
