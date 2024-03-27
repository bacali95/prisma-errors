import type { Prisma } from '@prisma/client';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { PrismaError } from './PrismaError';

export class PrismaClientUnknownError extends PrismaError {
  constructor(statusCode: StatusCodes, error: Prisma.PrismaClientUnknownRequestError) {
    super(statusCode, getReasonPhrase(statusCode), {
      code: 'UNKNOWN',
      message: error.message,
    });
  }
}

export function handleClientUnknownRequestError(
  error: Prisma.PrismaClientUnknownRequestError,
): PrismaError {
  return new PrismaClientUnknownError(StatusCodes.INTERNAL_SERVER_ERROR, error);
}
