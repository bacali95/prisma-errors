import { PrismaClient } from '@prisma/client';

import { handleKnownRequestError } from '../handleKnownRequestError';

describe('Handle known prisma errors', () => {
  let prismaClient: PrismaClient;

  beforeAll(() => {
    prismaClient = new PrismaClient({
      errorFormat: 'minimal',
    });
  });

  it('should test P2000 error', async () => {
    try {
      await prismaClient.entity.create({
        data: { shortString: 'Too long string' },
      });
    } catch (error: any) {
      const newError = handleKnownRequestError(error);

      expect(newError.name).toBe('PrismaClientKnownError');
      expect(newError.statusCode).toBe(413);
      expect(newError.message).toBe('Request Entity Too Large');
      expect(newError.data.meta?.['column_name']).toBe('(not available)');
    }
  });

  it.only('should test P2001 error', async () => {
    try {
      await prismaClient.entity.up({});
      d;
    } catch (error: any) {
      const newError = handleKnownRequestError(error);
      console.log(error);

      expect(newError.name).toBe('PrismaClientKnownError');
      expect(newError.statusCode).toBe(413);
      expect(newError.message).toBe('Request Entity Too Large');
      expect(newError.data.meta?.['column_name']).toBe('(not available)');
    }
  });
});
