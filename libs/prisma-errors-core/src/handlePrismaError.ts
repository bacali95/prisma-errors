import { Prisma } from '@prisma/client';

import { PrismaError } from './PrismaError';
import { handleClientKnownRequestError } from './handleClientKnownRequestError';
import { handleClientUnknownRequestError } from './handleClientUnknownRequestError';
import { PrismaErrorToHttpCodeMap } from './types';

export type AnyPrismaError =
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientUnknownRequestError
  | Prisma.PrismaClientRustPanicError
  | Prisma.PrismaClientInitializationError
  | Prisma.PrismaClientValidationError
  | Prisma.NotFoundError;

export function handlePrismError(
  error: AnyPrismaError,
  overrideMapping?: PrismaErrorToHttpCodeMap,
): PrismaError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handleClientKnownRequestError(error, overrideMapping);
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return handleClientUnknownRequestError(error);
  }

  return new PrismaError(500, 'Unknown Error', { code: 'UNKNOWN', message: error.message });
}
