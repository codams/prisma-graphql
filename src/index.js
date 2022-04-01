import { ApolloServer, PubSub } from "apollo-server";
import fs from "fs";

import path, { dirname } from "path";
import { fileURLToPath } from "url";
import PrismaClient from "@prisma/client";
import { getUserId } from "./utils.js";

import * as Mutation from "./resolvers/Mutation.js";
import * as User from "./resolvers/User.js";
import * as Link from "./resolvers/Link.js";
import * as Query from "./resolvers/Query.js";
import * as Subscription from "./resolvers/Subscription.js";

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
};

// TODO Adding a voting feature from https://www.howtographql.com/graphql-js/7-subscriptions/

const pubsub = new PubSub();
const prisma = new PrismaClient.PrismaClient();
// 3
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(dirname(__dirname), "/src/schema.graphql"),
    "utf8"
  ),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
