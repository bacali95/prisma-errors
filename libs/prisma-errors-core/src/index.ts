import { Prisma } from '@prisma/client';

import { PrismaError } from './PrismaError';
import { handleKnownRequestError } from './handleKnownRequestError';

export type AnyPrismaError =
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientUnknownRequestError
  | Prisma.PrismaClientRustPanicError
  | Prisma.PrismaClientInitializationError
  | Prisma.PrismaClientValidationError
  | Prisma.NotFoundError;

export function handleError(error: AnyPrismaError): PrismaError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handleKnownRequestError(error);
  }

  return new PrismaError(500, 'Unknown Error', { code: 'UNKNOWN', message: error.message });
}
