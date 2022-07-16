import { extendType, nonNull, objectType, stringArg } from "nexus";

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.field("user", {
      type: "User",
    });
  },
});

export const AuthQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("authenticatedUser", {
      type: "AuthPayload",
      async resolve(_, __, context) {
        if (!context.userId) {
          return null;
        }

        const user = await context.prisma.user.findUnique({
          where: { id: context.userId },
        });

        return {
          user,
        };
      },
    });
  },
});

export const AuthMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("authenticateUser", {
      type: "AuthPayload",
      args: {
        userId: nonNull(stringArg()),
      },
      async resolve(_, args, context) {
        const user = await context.prisma.user.findUnique({
          where: { id: args.userId },
        });

        return {
          user,
        };
      },
    });
  },
});
