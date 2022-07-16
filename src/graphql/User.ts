import { extendType, nonNull, nullable, objectType, stringArg } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("name");
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("users", {
      type: "User",
      async resolve(_, __, context) {
        return await context.prisma.user.findMany();
      },
    });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("addUser", {
      type: "User",
      args: {
        name: nonNull(stringArg()),
      },
      async resolve(_, args, context) {
        return await context.prisma.user.create({
          data: {
            name: args.name,
          },
        });
      },
    });
  },
});
