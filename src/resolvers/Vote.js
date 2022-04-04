export const link = (parent, args, context) => {
  return context.prisma.vote.findUnique({ where: { id: parent.id } }).link();
};

export const user = (parent, args, context) => {
  return context.prisma.vote.findUnique({ where: { id: parent.id } }).user();
};
