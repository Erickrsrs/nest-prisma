import { ConflictError } from './ConflictError';
import { PrismaClientError } from './PrismaClientError';

export class uniqueConstraintError extends ConflictError {
  constructor(err: PrismaClientError) {
    const uniqueField = err.meta.target;

    super(`A record with this ${uniqueField} already exists.`);
  }
}
