import { PrismaClient } from "@prisma/client";
import { ContextFunction } from "apollo-server-core";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  userId: string | null;
}

export const context: ContextFunction = async ({ req }) => {
  const userId = req.headers.userid || undefined;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return {
    prisma,
    userId: user ? user.id : undefined,
  };
};
