import { objectType, extendType, inputObjectType } from 'nexus';

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

export const ProfileInput = inputObjectType({
  name: 'ProfileInput',
  description: 'Profile Input',
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
      args: { input: ProfileInput },
      resolve(_parent, args, { prisma }) {
        const { id, userId } = args.input || {};

        if (id) {
          return prisma.profile.findUnique({
            where: { id },
          });
        }

        if (userId) {
          return prisma.profile.findUnique({
            where: { userId },
          });
        }

        return null;
      },
    });
  },
});

export const ProfileMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateProfile', {
      type: 'Profile',
      description: 'Update a profile',
      args: { input: ProfileInput },
      resolve(_parent, args, { prisma, token }) {
        const authId = token.sub;
        const { id, userId, ...input } = args.input || {};

        return prisma.profile.update({
          where: { id: authId },
          data: {
            ...input,
          },
        });
      },
    });

    t.field('deleteProfile', {
      type: 'Profile',
      description: 'Delete a profile',
      args: { input: ProfileInput },
      resolve(_parent, args, { prisma, token }) {
        const authId = token.sub;

        return prisma.profile.delete({
          where: { id: authId },
        });
      },
    });
  },
});
