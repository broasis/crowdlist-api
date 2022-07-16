import { extendType, nonNull, objectType, stringArg } from "nexus";

export const List = objectType({
  name: "List",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
    t.nonNull.list.nonNull.field("items", {
      type: "ListItem",
      resolve(parent, _, context) {
        return context.prisma.listItem.findMany({
          where: {
            listId: parent.id,
          },
        });
      },
    });
  },
});

export const ListQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("lists", {
      type: "List",
      async resolve(_, __, context) {
        return await context.prisma.list.findMany();
      },
    });
  },
});

export const LinkMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteList", {
      type: "List",
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_, args, context) {
        context.prisma.listItem.deleteMany({
          where: { listId: args.id },
        });
        return context.prisma.list.delete({
          where: { id: args.id },
        });
      },
    });

    t.nonNull.field("addList", {
      type: "List",
      args: {
        name: nonNull(stringArg()),
      },
      resolve(_, args, context) {
        const newList = context.prisma.list.create({
          data: {
            name: args.name,
          },
        });
        return newList;
      },
    });
  },
});
