export type PrismaErrorData = {
  code: string;
  message: string;
  meta?: Record<string, any>;
};

export class PrismaError extends Error {
  statusCode: number;
  data: PrismaErrorData;

  constructor(statusCode: number, message: string, data: PrismaErrorData) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PrismaError);
    }

    this.name = this.constructor.name;

    this.statusCode = statusCode;
    this.data = data;
  }
}
