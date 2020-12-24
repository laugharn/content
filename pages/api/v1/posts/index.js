import { handlePost } from '~/lib/mail'
import { PrismaClient } from '@prisma/client'
import { withSession } from '~/lib/session'

// Create Post
// If status is 'published', fire off an email if the settings are correct

const store = async (req, res) => {
  const prisma = new PrismaClient()
  await prisma.$connect()

  const { channelId, ...data } = req.body

  const obj = {
    data: {
      ...data,
      channel: {
        connect: {
          id: channelId,
        },
      },
      user: {
        connect: {
          id: req.session.get('user').id,
        },
      },
    },
    include: {
      channel: true,
    },
  }

  if (data.status === 'published') {
    obj.data.publishedAt = new Date()
  }

  const post = await prisma.post.create(obj)

  await prisma.$disconnect()

  if (post.status === 'published') {
    await handlePost(post)
  }

  res.json(post)
}

const handler = async (req, res) => {
  if (req.method === 'POST') {
    await store(req, res)
  } else {
    res.status(405).end('Method Not Allowed')
  }
}

export default withSession(handler)
