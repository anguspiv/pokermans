import NextAuth, { Session } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';
import { withSentry } from '@sentry/nextjs';
import { prisma } from '@db/prisma';
import logger from '@utils/logger';

interface NextAuthMessage {
  user?: User;
}

const google = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID ?? '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
});

const discord = DiscordProvider({
  clientId: process.env.DISCORD_CLIENT_ID ?? '',
  clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
});

const email = EmailProvider({
  server: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  },
  from: process.env.SMTP_FROM,
});

const providers = [email, discord, google];

const adapter = PrismaAdapter(prisma);

const createProfile = async ({ id, name }: User) => {
  const [firstName, lastName] = name?.split(' ') || [];

  try {
    await prisma.profile.create({
      data: {
        userId: id,
        firstName,
        lastName,
      },
    });
  } catch (error) {
    logger.error('Error creating profile', { error });
  }
};

const createUser = async ({ user }: NextAuthMessage) => {
  if (user?.id) {
    await createProfile(user);
  }
};

export interface AuthSession extends Session {
  accessToken?: unknown;
}

export default withSentry(
  NextAuth({
    adapter,
    providers,
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: 'jwt' },
    events: {
      createUser,
    },
    callbacks: {
      async jwt({ token, account }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
          // eslint-disable-next-line no-param-reassign
          token.accessToken = account.access_token;
        }
        return token;
      },
      async session({ session, token }) {
        // Send properties to the client, like an access_token from a provider.

        const newSession: AuthSession = {
          ...session,
          accessToken: token.accessToken,
        };
        return newSession as Session;
      },
    },
  }),
);
