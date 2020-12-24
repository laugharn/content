import { PrismaClient } from '@prisma/client'
import { withSession } from '~/lib/session'

const destroy = async (req, res) => {
  req.session.destroy()

  res.end('ok')
}

const login = async (req, res) => {
  const { code, dev, email, redirect = '/home' } = req.body

  if (dev) {
    if (process.env.NEXT_PUBLIC_GIT_COMMIT_REF === 'main') {
      res.status(401).end('Unauthorized')
      return
    }

    const prisma = new PrismaClient()
    await prisma.$connect()

    const user = await prisma.user.findUnique({
      include: {
        subscriptions: true,
      },
      where: {
        email,
      },
    })

    await prisma.$disconnect()

    if (!user) {
      res.status(404).end('Not Found')
      return
    }

    req.session.set('user', user)
    await req.session.save()

    res.json({ redirect, user })
    return
  }
}

const handler = async (req, res) => {
  if (req.method == 'DELETE') {
    await destroy(req, res)
  } else if (req.method === 'PUT') {
    await login(req, res)
  }
}

export default withSession(handler)
