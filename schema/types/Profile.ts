import { objectType, extendType, inputObjectType } from 'nexus';
import { UserInputError } from 'apollo-server-micro';

interface ProfileWhere {
  id?: string;
  userId?: string;
}

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
    t.string('bio', { description: 'A 250 character description of the User' });
    t.string('avatarId', { description: 'The ID of the User Profile Avatar' });
    t.field('avatar', {
      type: 'Image',
      description: 'A User Profile Avatar Image',
      resolve(root, args, { prisma }) {
        if (root.avatarId) {
          return prisma.image.findUnique({ where: { id: root.avatarId } });
        }

        return null;
      },
    });
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
    t.string('bio', { description: 'A 250 character description of the User' });
    t.string('avatarId', { description: 'The ID of the User Profile Avatar' });
  },
});

export const ProfileQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('profile', {
      type: 'Profile',
      description: "Find a User's profile",
      args: { input: ProfileInput },
      resolve(_parent, args, { prisma, token }) {
        const { id, userId } = args.input || {};
        const authId = token?.sub;

        const where: ProfileWhere = {};

        if (id) {
          where.id = id;
        } else if (userId) {
          where.userId = userId;
        } else {
          where.userId = authId;
        }

        return prisma.profile.findUnique({
          where,
        });
      },
    });
  },
});

// TODO: add ability to delete avatar image
export const ProfileMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateProfile', {
      type: 'Profile',
      description: 'Update a profile',
      args: { input: ProfileInput },
      async resolve(_parent, args, { prisma, token }) {
        const authId = token?.sub;
        const { id, firstName, lastName, nickname, bio, avatarId } = args.input || {};

        const where: ProfileWhere = {};

        if (id) {
          where.id = id;
        } else {
          where.userId = authId;
        }

        const profile = await prisma.profile.findUnique({
          where,
        });

        if (!profile) {
          throw new UserInputError('profile not found');
        }

        const data = { firstName, lastName, nickname, bio, avatarId };

        const result = await prisma.profile.update({
          where,
          data,
        });

        return result;
      },
    });

    t.field('deleteProfile', {
      type: 'Profile',
      description: 'Delete a profile',
      args: { input: ProfileInput },
      resolve(_parent, args, { prisma, token }) {
        const authId = token?.sub;

        return prisma.profile.delete({
          where: { userId: authId },
        });
      },
    });
  },
});
