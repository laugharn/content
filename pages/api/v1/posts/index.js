import { PrismaClient } from "@prisma/client";
import { withSession } from '~/lib/session'

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  await prisma.$connect();

  const { channelId, ...data } = req.body

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
          id: req.session.get('user').id,
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

export default withSession(handler);
