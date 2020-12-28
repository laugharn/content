import { PrismaClient } from '@prisma/client'
import { withSession } from '~/lib/session'

const handler = async (req, res) => {
  const prisma = new PrismaClient()
  await prisma.$connect()

  const createdAt = new Date()

  const subscription = await prisma.subscription.create({
    data: {
      channel: {
        connect: {
          name: req.body.channel,
        },
      },
      user: {
        connectOrCreate: {
          create: {
            authenticatedAt: new Date(),
            createdAt,
            email: req.body.email,
            roles: {
              connect: [{ name: 'subscriber' }, { name: 'user' }],
            },
          },
          where: {
            email: req.body.email,
          },
        },
      },
    },
    include: {
      user: {
        include: {
          roles: true,
          subscriptions: true,
        },
      },
    },
  })

  await prisma.$disconnect()

  console.log((subscription.user.createdAt.getTime() / 1000) === (createdAt.getTime() / 1000))

  req.session.set('user', subscription.user)
  await req.session.save()

  res.json({ subscription })
}

export default withSession(handler)
