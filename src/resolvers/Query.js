export const feed = (parent, args, context) => {
  return context.prisma.link.findMany();
};

export const link = async (_, { id }, context) => {
  return context.prisma.link.findFirst({
    where: {
      id: parseInt(id),
    },
  });
};
