import { Prisma } from "@prisma/client";
import { PrismaError } from "./PrismaError";
import { handleClientKnownRequestError } from "./handleClientKnownRequestError";

export type AnyPrismaError =
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientUnknownRequestError
  | Prisma.PrismaClientRustPanicError
  | Prisma.PrismaClientInitializationError
  | Prisma.PrismaClientValidationError
  | Prisma.NotFoundError;

export function handlePrismError(error: AnyPrismaError): PrismaError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handleClientKnownRequestError(error);
  }

  return new PrismaError(500, 'Unknown Error', { code: 'UNKNOWN', message: error.message });
}
