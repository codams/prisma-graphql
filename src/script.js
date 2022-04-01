import PrismaClient from "@prisma/client";

const prisma = new PrismaClient.PrismaClient();

async function main() {
  const allLinks = await prisma.link.findMany();
  const newLink = await prisma.link.create({
    data: {
      description: "Fullstack tutorial for GraphQL",
      url: "www.howtographql.com",
    },
  });
  console.log(allLinks);
}

main()
  .catch((e) => {
    throw e;
  })
  // 5
  .finally(async () => {
    await prisma.$disconnect();
  });
