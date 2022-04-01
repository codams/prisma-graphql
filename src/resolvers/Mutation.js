import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { APP_SECRET, getUserId } from "../utils.js";

export const signup = async (parent, args, context, info) => {
  const password = await bcryptjs.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: {
      ...args,
      password,
    },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
};

export const login = async (parent, { email, password }, context, info) => {
  const user = await context.prisma.user.findUnique({
    where: { email: email },
  });
  if (!user) {
    throw new Error("No such user found");
  }

  // 2
  const valid = await bcryptjs.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 3
  return {
    token,
    user,
  };
};

export const post = async (parent, { url, description }, context, info) => {
  const { userId } = context;

  const newLink = await context.prisma.link.create({
    data: {
      url: url,
      description: description,
      postedBy: { connect: { id: userId } },
    },
  });
  context.pubsub.publish("NEW_LINK", newLink);

  return newLink;
};

export const updateLink = async (parent, { id, url, description }, context) => {
  return await context.prisma.link.update({
    where: {
      id: parseInt(id),
    },
    data: {
      url: url,
      description: description,
    },
  });
};
export const deleteLink = async (parent, { id }, context) => {
  return context.prisma.link
    .delete({
      where: {
        id: parseInt(id),
      },
    })
    .then((success) => {
      return context.prisma.link.findMany();
    });
};
