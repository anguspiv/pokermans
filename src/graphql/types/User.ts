import { objectType, extendType, inputObjectType, mutationType } from 'nexus';

// eslint-disable-next-line import/prefer-default-export
export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id', { description: "The User's id" });
    t.string('name', { description: "The User's full name" });
    t.string('email', { description: "The User's email" });
    t.datetime('emailVerified', { description: 'The DateTime when the User verified their email' });
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
      resolve(_parent, { input: { name, email } = {} }, ctx) {
        if (name) {
          return ctx.prisma.user.findMany({
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

        return ctx.prisma.user.findMany();
      },
    });
    t.field('user', {
      type: 'User',
      description: 'Find a single user',
      args: { input: UserInput },
      resolve(_parent, { input = {} }, ctx) {
        const { id, email } = input;

        return ctx.prisma.user.findUnique({
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
      resolve(_parent, { input: { id, name, image, ...input } = {} }, ctx) {
        const [firstName, lastName] = name.split(' ');
        return ctx.prisma.user.create({
          data: {
            Profile: {
              create: {
                firstName,
                lastName,
                image,
              },
            },
            name,
            image,
            ...input,
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
      resolve(_parent, { input: { id, ...input } = {} }, ctx) {
        return ctx.prisma.user.update({
          where: {
            id,
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
      resolve(_parent, { input: { id } = {} }, ctx) {
        return ctx.prisma.user.delete({
          where: {
            id,
          },
        });
      },
    });
  },
});
