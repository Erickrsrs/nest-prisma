import { DatabaseError } from '../types/DatabaseError';
import { PrismaClientError } from '../types/PrismaClientError';
import { uniqueConstraintError } from '../types/UniqueConstraintError';

enum PrismaErrors {
  uniqueConstraintFail = 'P2002',
}

export const handleDatabaseErrors = (err: PrismaClientError): Error => {
  switch (err.code) {
    case PrismaErrors.uniqueConstraintFail:
      return new uniqueConstraintError(err);

    default:
      return new DatabaseError(err.message);
  }
};
