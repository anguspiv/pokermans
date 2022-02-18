import { AuthenticationError } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { prisma } from '../db/prisma';

const secret = process.env.NEXTAUTH_SECRET;

export type Context = {
  prisma: PrismaClient;
  session: Session;
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
