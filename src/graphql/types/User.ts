import { objectType, extendType, stringArg } from 'nexus';

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

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: 'User',
      description: 'Get a list of Users',
      args: {
        name: stringArg({ description: 'Filter the list of Users by name' }),
      },
      resolve(_parent, { name }, ctx) {
        if (name) {
          return ctx.prisma.user.findMany({
            where: {
              OR: [
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
      args: {
        id: stringArg({ description: "Search by the User's id" }),
        email: stringArg({ description: "Search by the User's email" }),
      },
      resolve(_parent, { id, email }, ctx) {
        if (id) {
          return ctx.prisma.user.findUnique({ where: { id } });
        }

        if (email) {
          return ctx.prisma.user.findUnique({ where: { email } });
        }

        return null;
      },
    });
  },
});
