import type { Prisma } from '@prisma/client';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { PrismaError } from './PrismaError';
import { PrismaErrorToHttpCodeMap } from './types';

export const DEFAULT_CLIENT_KNOWN_REQUEST_ERROR_MAPPING: PrismaErrorToHttpCodeMap = {
  P2001: StatusCodes.NOT_FOUND,
  P2015: StatusCodes.NOT_FOUND,
  P2018: StatusCodes.NOT_FOUND,
  P2021: StatusCodes.NOT_FOUND,
  P2022: StatusCodes.NOT_FOUND,
  P2025: StatusCodes.NOT_FOUND,
  P2002: StatusCodes.CONFLICT,
  P2003: StatusCodes.CONFLICT,
  P2000: StatusCodes.BAD_REQUEST,
  P2004: StatusCodes.BAD_REQUEST,
  P2005: StatusCodes.BAD_REQUEST,
  P2006: StatusCodes.BAD_REQUEST,
  P2007: StatusCodes.BAD_REQUEST,
  P2008: StatusCodes.BAD_REQUEST,
  P2009: StatusCodes.BAD_REQUEST,
  P2011: StatusCodes.BAD_REQUEST,
  P2012: StatusCodes.BAD_REQUEST,
  P2013: StatusCodes.BAD_REQUEST,
  P2014: StatusCodes.BAD_REQUEST,
  P2016: StatusCodes.BAD_REQUEST,
  P2017: StatusCodes.BAD_REQUEST,
  P2019: StatusCodes.BAD_REQUEST,
  P2020: StatusCodes.BAD_REQUEST,
  P2023: StatusCodes.BAD_REQUEST,
  P2026: StatusCodes.BAD_REQUEST,
  P2029: StatusCodes.BAD_REQUEST,
  P2033: StatusCodes.BAD_REQUEST,
  P2024: StatusCodes.REQUEST_TIMEOUT,
  P2010: StatusCodes.INTERNAL_SERVER_ERROR,
  P2027: StatusCodes.INTERNAL_SERVER_ERROR,
  P2028: StatusCodes.INTERNAL_SERVER_ERROR,
  P2030: StatusCodes.INTERNAL_SERVER_ERROR,
  P2031: StatusCodes.INTERNAL_SERVER_ERROR,
  P2034: StatusCodes.INTERNAL_SERVER_ERROR,
  P2035: StatusCodes.INTERNAL_SERVER_ERROR,
  P2036: StatusCodes.INTERNAL_SERVER_ERROR,
  P2037: StatusCodes.INTERNAL_SERVER_ERROR,
};

export class PrismaClientKnownError extends PrismaError {
  constructor(statusCode: StatusCodes, error: Prisma.PrismaClientKnownRequestError) {
    super(statusCode, getReasonPhrase(statusCode), {
      code: error.code,
      message: error.message,
      meta: error.meta,
    });
  }
}

export function handleClientKnownRequestError(
  error: Prisma.PrismaClientKnownRequestError,
  overrideMapping?: PrismaErrorToHttpCodeMap,
): PrismaError {
  const finalMapping = { ...DEFAULT_CLIENT_KNOWN_REQUEST_ERROR_MAPPING, ...overrideMapping };

  if (finalMapping[error.code]) {
    return new PrismaClientKnownError(finalMapping[error.code], error);
  }

  return new PrismaError(500, 'Unknown Error', { code: error.code, message: error.message });
}
