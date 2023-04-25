import type { Prisma } from '@prisma/client';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { PrismaError } from './PrismaError';

export class PrismaClientKnownError extends PrismaError {
  constructor(statusCode: StatusCodes, error: Prisma.PrismaClientKnownRequestError) {
    super(statusCode, getReasonPhrase(statusCode), {
      code: error.code,
      message: error.message,
      meta: error.meta,
    });
  }
}

export function handleKnownRequestError(error: Prisma.PrismaClientKnownRequestError): PrismaError {
  switch (error.code) {
    case 'P2000':
      return new PrismaClientKnownError(StatusCodes.REQUEST_TOO_LONG, error);

    case 'P2001':
    case 'P2015':
    case 'P2018':
      return new PrismaClientKnownError(StatusCodes.NOT_FOUND, error);

    case 'P2002':
    case 'P2034':
      return new PrismaClientKnownError(StatusCodes.CONFLICT, error);

    case 'P2005':
    case 'P2006':
    case 'P2008':
    case 'P2011':
    case 'P2012':
    case 'P2013':
    case 'P2014':
    case 'P2019':
    case 'P2020':
    case 'P2023':
    case 'P2033':
      return new PrismaClientKnownError(StatusCodes.BAD_REQUEST, error);

    case 'P2007':
      return new PrismaClientKnownError(StatusCodes.UNPROCESSABLE_ENTITY, error);

    case 'P2024':
      return new PrismaClientKnownError(StatusCodes.REQUEST_TIMEOUT, error);

    case 'P2003':
    case 'P2004':
    case 'P2010':
    case 'P2016':
    case 'P2017':
    case 'P2021':
    case 'P2022':
    case 'P2025':
    case 'P2026':
    case 'P2027':
    case 'P2028':
    case 'P2030':
    case 'P2031':
      return new PrismaClientKnownError(StatusCodes.INTERNAL_SERVER_ERROR, error);

    default:
      return new PrismaError(500, 'Unknown Error', { code: error.code, message: error.message });
  }
}
