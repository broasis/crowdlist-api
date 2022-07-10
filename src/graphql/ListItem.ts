import { ApolloError } from "apollo-server";
import { arg, extendType, nonNull, objectType, stringArg } from "nexus";

export const ListItem = objectType({
  name: "ListItem",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
    t.nonNull.string("listId");
    t.nonNull.list.nonNull.string("votes");
    t.nonNull.field("list", {
      type: "List",
      async resolve(parent, _, context) {
        const list = await context.prisma.list.findUnique({
          where: {
            id: parent.listId,
          },
        });

        if (!list) {
          throw new ApolloError(`List with id ${parent.id} does not exist.`);
        }

        return list;
      },
    });
  },
});

export const ListItemQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getAllItems", {
      type: "ListItem",
      async resolve(_, __, context) {
        return await context.prisma.listItem.findMany();
      },
    });

    t.nonNull.list.nonNull.field("getItemsFromList", {
      type: "ListItem",
      args: {
        listId: nonNull(stringArg()),
      },
      async resolve(_, args, context) {
        return await context.prisma.listItem.findMany({
          where: {
            listId: args.listId,
          },
        });
      },
    });
  },
});

export const ListItemMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("addItem", {
      type: "ListItem",
      args: {
        listId: nonNull(stringArg()),
        name: nonNull(stringArg()),
        userId: nonNull(stringArg()),
      },
      async resolve(_, args, context) {
        const { listId, name, userId } = args;

        const itemExists = await context.prisma.listItem.findFirst({
          where: {
            name: name,
          },
        });

        if (itemExists) {
          // Do nothing if item exists and has already been voted by user
          if (itemExists.votes.includes(userId)) {
            return itemExists;
          }

          // Add vote if item already exists
          return await context.prisma.listItem.update({
            where: {
              id: itemExists.id,
            },
            data: {
              votes: [...itemExists.votes, userId],
            },
          });
        }

        // Add item with user vote, if item does not exist
        return await context.prisma.listItem.create({
          data: {
            name: name,
            votes: [userId],
            list: {
              connect: {
                id: listId,
              },
            },
          },
        });
      },
    });

    t.nonNull.field("voteItem", {
      type: "ListItem",
      args: {
        itemId: nonNull(stringArg()),
        userId: nonNull(stringArg()),
      },
      async resolve(_, args, context) {
        const { itemId, userId } = args;

        const item = await context.prisma.listItem.findUnique({
          where: {
            id: itemId,
          },
        });

        if (!item) {
          throw new ApolloError(`The item you voted for does not exist.`);
        }

        if (item.votes.includes(userId)) {
          // Remove vote from item if user has already voted for it
          if (item.votes.length === 1) {
            // Remove item if it has been the only remaining vote
            return await context.prisma.listItem.delete({
              where: { id: itemId },
            });
          }
          return await context.prisma.listItem.update({
            where: { id: itemId },
            data: {
              votes: item.votes.filter((v) => v !== userId),
            },
          });
        }

        return await context.prisma.listItem.update({
          where: {
            id: itemId,
          },
          data: {
            votes: [...item.votes, userId],
          },
        });
      },
    });
  },
});
