import { AuthenticationError } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken, JWT } from 'next-auth/jwt';
import { prisma } from '../db/prisma';

const secret: string = process.env.NEXTAUTH_SECRET || '';

export type Context = {
  prisma: PrismaClient;
  token: JWT;
  req: NextApiRequest;
  res: NextApiResponse;
};

interface ContextParams {
  req: NextApiRequest;
  res: NextApiResponse;
}

export async function createContext({ req, res }: ContextParams): Promise<Context> {
  const token = await getToken({ req, secret });

  if (!token) {
    throw new AuthenticationError('unauthorized');
  }

  return {
    token,
    prisma,
    req,
    res,
  };
}
