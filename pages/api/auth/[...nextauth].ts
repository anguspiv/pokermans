import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';
import { withSentry } from '@sentry/nextjs';
import { prisma } from '@db/prisma';

interface NextAuthMessage {
  user?: User;
}

const google = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID ?? '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
});

const discord = DiscordProvider({
  clientId: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
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

const createProfile = (user: User) => {
  const data = {
    userId: user.id,
  };

  return prisma.profile.create({ data });
};

const createUser = async ({ user }: NextAuthMessage) => {
  if (user?.id) {
    createProfile(user);
  }
};

export default withSentry(
  NextAuth({
    adapter,
    providers,
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: 'jwt' },
    events: {
      createUser,
    },
  }),
);
