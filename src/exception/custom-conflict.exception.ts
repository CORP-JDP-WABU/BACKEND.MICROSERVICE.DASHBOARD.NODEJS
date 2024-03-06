import { ConflictException } from '@nestjs/common';

export class NotExistStudentRegisterCustomException extends ConflictException {
  constructor(customCode: string) {
    super(`El dato del estudiante no existe [${customCode}`);
  }
}

export class NotExistUniversityRegisterCustomException extends ConflictException {
  constructor(customCode: string) {
    super(`El dato de la universidad no existe [${customCode}`);
  }
}

export class NotExistDashboardCustomException extends ConflictException {
  constructor(customCode: string) {
    super(`El dashboard no esta habilitado para el estudiante [${customCode}`);
  }
}