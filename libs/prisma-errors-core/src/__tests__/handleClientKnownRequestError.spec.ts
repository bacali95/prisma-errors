import { PrismaClient } from '@prisma/client';

import { handleClientKnownRequestError } from '../handleClientKnownRequestError';

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

      expect(false).toBe(true);
    } catch (error: any) {
      const newError = handleClientKnownRequestError(error);

      expect(newError.name).toBe('PrismaClientKnownError');
      expect(newError.statusCode).toBe(413);
      expect(newError.message).toBe('Request Entity Too Large');
      expect(newError.data.meta?.['column_name']).toBe('(not available)');
    }
  });
});
