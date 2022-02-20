import { objectType, extendType, inputObjectType, mutationType } from 'nexus';

// eslint-disable-next-line import/prefer-default-export
export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id', { description: "The User's id" });
    t.string('name', { description: "The User's full name" });
    t.string('email', { description: "The User's email" });
    // t.datetime('emailVerified', { description: 'The DateTime when the User verified their email' });
    t.string('image', { description: "The User's image when using social accounts to register" });
    t.field('profile', {
      type: 'Profile',
      description: "The User's Profile",
      resolve(root, args, ctx) {
        return ctx.prisma.profile.findUnique({ where: { userId: root.id } });
      },
    });
  },
});

export const UserInput = inputObjectType({
  name: 'UserInput',
  description: 'The User Input',
  definition(t) {
    t.string('id', { description: "The User's id" });
    t.string('name', { description: "The User's full name" });
    t.string('email', { description: "The User's email" });
    t.string('image', { description: "The User's image when using social accounts to register" });
  },
});

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: 'User',
      description: 'Get a list of Users',
      args: {
        input: UserInput,
      },
      resolve(_parent, { input }, { prisma }) {
        const name = input?.name || '';
        const email = input?.email || '';

        if (name) {
          return prisma.user.findMany({
            where: {
              OR: [
                {
                  email: {
                    contains: email,
                    mode: 'insensitive',
                  },
                },
                {
                  name: {
                    contains: name,
                    mode: 'insensitive',
                  },
                },
                {
                  Profile: {
                    firstName: {
                      contains: name,
                      mode: 'insensitive',
                    },
                  },
                },
                {
                  Profile: {
                    lastName: {
                      contains: name,
                      mode: 'insensitive',
                    },
                  },
                },
                {
                  Profile: {
                    nickname: {
                      contains: name,
                      mode: 'insensitive',
                    },
                  },
                },
              ],
            },
          });
        }

        return prisma.user.findMany();
      },
    });
    t.field('user', {
      type: 'User',
      description: 'Find a single user',
      args: { input: UserInput },
      resolve(_parent, { input }, { token, prisma }) {
        const email = input?.email || '';
        let id = input?.id ? input.id : token?.sub;
        id = id || '';

        return prisma.user.findUnique({
          where: {
            id,
            email,
          },
        });
      },
    });
  },
});

export const UserMutation = mutationType({
  definition(t) {
    t.field('createUser', {
      type: 'User',
      description: 'Create a new User',
      args: {
        input: UserInput,
      },
      resolve(_parent, args, { prisma }) {
        const { id, image, ...input } = args.input || {};
        const name = input?.name || '';

        const [firstName, lastName] = name.split(' ');

        return prisma.user.create({
          data: {
            Profile: {
              create: {
                firstName,
                lastName,
                image,
              },
            },
            image,
            ...input,
            name,
          },
        });
      },
    });

    t.field('updateUser', {
      type: 'User',
      description: 'Update a User',
      args: {
        input: UserInput,
      },
      resolve(_parent, args, { prisma, token }) {
        const userId = token.sub;
        const { id, ...input } = args.input || {};

        return prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            ...input,
          },
        });
      },
    });

    t.field('deleteUser', {
      type: 'User',
      description: 'Delete a User',
      args: {
        input: UserInput,
      },
      resolve(_parent, args, { prisma, token }) {
        const userId = token.sub;

        return prisma.user.delete({
          where: {
            id: userId,
          },
        });
      },
    });
  },
});
