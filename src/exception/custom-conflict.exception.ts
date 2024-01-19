import { ConflictException } from '@nestjs/common';

export class NotExistStudentRecoveryCustomException extends ConflictException {
  constructor() {
    super(`El dato del estudiante no existe`);
  }
}

export class NotExistUniversityRegisterCustomException extends ConflictException {
  constructor() {
    super(`El dato de la universidad no existe`);
  }
}

export class NotExistDashboardCustomException extends ConflictException {
  constructor() {
    super(`El dashboard no esta habilitado para el estudiante`);
  }
}