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
      expect(newError.statusCode).toBe(400);
      expect(newError.message).toBe('Bad Request');
      expect(newError.data.code).toBe('P2000');
      expect(newError.data.message).toMatchInlineSnapshot(`
        "
        Invalid \`prisma.entity.create()\` invocation:


        The provided value for the column is too long for the column's type. Column: (not available)"
      `);
      expect(newError.data.meta).toEqual({
        modelName: 'Entity',
        column_name: '(not available)',
      });
    }
  });

  it('should test P2002 error', async () => {
    try {
      await prismaClient.entity.create({ data: { id: 999 } });
      await prismaClient.entity.create({ data: { id: 999 } });

      expect(false).toBe(true);
    } catch (error: any) {
      const newError = handleClientKnownRequestError(error);

      expect(newError.name).toBe('PrismaClientKnownError');
      expect(newError.statusCode).toBe(409);
      expect(newError.message).toBe('Conflict');
      expect(newError.data.code).toBe('P2002');
      expect(newError.data.message).toMatchInlineSnapshot(`
        "
        Invalid \`prisma.entity.create()\` invocation:


        Unique constraint failed on the fields: (\`id\`)"
      `);
      expect(newError.data.meta).toEqual({
        modelName: 'Entity',
        target: ['id'],
      });
    }
  });

  it('should test P2003 error', async () => {
    try {
      await prismaClient.entity.create({ data: { relatedEntityId: -1 } });

      expect(false).toBe(true);
    } catch (error: any) {
      const newError = handleClientKnownRequestError(error);

      expect(newError.name).toBe('PrismaClientKnownError');
      expect(newError.statusCode).toBe(409);
      expect(newError.message).toBe('Conflict');
      expect(newError.data.code).toBe('P2003');
      expect(newError.data.message).toMatchInlineSnapshot(`
        "
        Invalid \`prisma.entity.create()\` invocation:


        Foreign key constraint failed on the field: \`Entity_relatedEntityId_fkey (index)\`"
      `);
      expect(newError.data.meta).toEqual({
        modelName: 'Entity',
        field_name: 'Entity_relatedEntityId_fkey (index)',
      });
    }
  });
});
