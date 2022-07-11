import { ApolloServer } from "apollo-server";
import { context } from "./context";

import { schema } from "./schema";

export const server = new ApolloServer({
  schema,
  context,
});

const port = process.env.PORT || 5000;

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
