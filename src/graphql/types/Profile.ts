import { objectType, extendType, stringArg } from 'nexus';
import logger from '../../utils/logger';

// eslint-disable-next-line import/prefer-default-export
export const Profile = objectType({
  name: 'Profile',
  description: 'User Profile information for display',
  definition(t) {
    t.string('id', { description: 'The Profile ID' });
    t.string('userId', { description: 'The Profiles User ID' });
    t.string('firstName', { description: "The User Profile's First Name" });
    t.string('lastName', { description: "The User Profile's Last Name" });
    t.string('nickname', { description: "The User Profile's Nickname" });
    t.string('image', { description: "The User Profile's Image URL" });
    t.string('bio', { description: 'A 250 character description of the User' });
  },
});

export const ProfileQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('profile', {
      type: 'Profile',
      description: "Find a User's profile",
      args: {
        id: stringArg({ description: 'The ID of the Profile' }),
        userId: stringArg({ description: 'The user ID of the Profile' }),
      },
      resolve(_parent, { id, userId }, ctx) {
        logger.info('profile id', id);

        if (id) {
          return ctx.prisma.profile.findUnique({
            where: { id },
          });
        }

        if (userId) {
          return ctx.prisma.profile.findUnique({
            where: { userId },
          });
        }

        return null;
      },
    });
  },
});
