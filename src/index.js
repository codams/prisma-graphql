import { ApolloServer } from "apollo-server";
import fs from "fs";

import path, { dirname } from "path";
import { fileURLToPath } from "url";
import PrismaClient from "@prisma/client";
import { getUserId } from "./utils.js";

import * as Mutation from "./resolvers/Mutation.js";
import * as User from "./resolvers/User.js";
import * as Link from "./resolvers/Link.js";
import * as Query from "./resolvers/Query.js";

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
};

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
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
