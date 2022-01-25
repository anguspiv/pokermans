import { PrismaClient } from '@prisma/client';

export type Context = {
  prisma: PrismaClient;
};

export async function createContext(prisma: PrismaClient): Promise<Context> {
  return {
    prisma,
  };
}
