import { objectType, extendType } from 'nexus';

// eslint-disable-next-line import/prefer-default-export
export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
  },
});

export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: 'User',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.user.findMany();
      },
    });
  },
});
