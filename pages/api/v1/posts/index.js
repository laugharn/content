import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  await prisma.$connect();

  const { channelId, userId, ...data } = req.body

  const post = await prisma.post.create({
    data: {
      ...data,
      channel: {
        connect: {
          id: channelId,
        }
      },
      user: {
        connect: {
          id: userId,
        }
      }
    },
    include: {
      channel: true,
    },
  });

  await prisma.$disconnect();

  res.json(post);
};

export default handler;
