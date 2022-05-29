import { objectType, extendType, inputObjectType, stringArg, intArg } from 'nexus';
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

const getProfileSearchTermWhere = (searchTerm: string) => {
  const search = {
    contains: searchTerm,
    mode: 'insensitive',
  };

  const where = {
    OR: [
      {
        firstName: search,
      },
      {
        lastName: search,
      },
      {
        nickname: search,
      },
    ],
  };

  return where;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getProfileFieldsWhere = ({ firstName, lastName, nickname }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  if (firstName) {
    where.firstName = {
      contains: firstName,
      mode: 'insensitive',
    };
  }

  if (lastName) {
    where.lastName = {
      contains: lastName,
      mode: 'insensitive',
    };
  }

  if (nickname) {
    where.nickname = {
      contains: nickname,
      mode: 'insensitive',
    };
  }

  return where;
};

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

    t.nonNull.list.field('profiles', {
      type: 'Profile',
      description: 'Find a list of User Profiles',
      args: {
        searchTerm: stringArg({
          description: 'The search term to search for',
        }),
        firstName: stringArg({
          description: "The User Profile's First Name",
        }),
        lastName: stringArg({
          description: "The User Profile's Last Name",
        }),
        nickname: stringArg({
          description: "The User Profile's Nickname",
        }),
        limit: intArg({
          description: 'The number of results to return',
          default: 10,
        }),
        offset: intArg({
          description: 'The number of results to skip',
          default: 0,
        }),
        sortBy: stringArg({
          description: 'The field to order by',
          default: 'id',
        }),
        order: stringArg({
          description: 'The order to sort by',
          default: 'asc',
        }),
      },
      resolve(_parent, { searchTerm, limit, offset, sortBy, order, ...fields }, { prisma }) {
        let where = {};

        if (searchTerm) {
          where = getProfileSearchTermWhere(searchTerm);
        }

        if (!searchTerm) {
          where = getProfileFieldsWhere(fields);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: any = {
          where,
          take: limit,
        };

        if (offset) {
          query.skip = offset;
        }

        if (sortBy) {
          query.orderBy = [{ [sortBy]: order }];
        }

        return prisma.profile.findMany(query);
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
