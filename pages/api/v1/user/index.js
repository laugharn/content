import { PrismaClient } from '@prisma/client'
import { randomNumbers } from '~/lib/string'
import { ttl } from '~/lib/time'
import { withSession } from '~/lib/session'

const destroy = async (req, res) => {
  req.session.destroy()

  res.end('ok')
}

const getStarted = async (req, res) => {
  const { email, redirect = '/home' } = req.body

  const prisma = new PrismaClient()
  await prisma.$connect()

  const pass = await prisma.pass.create({
    data: {
      code: randomNumbers(6),
      email,
      expiredAt: ttl(),
      redirect,
    },
  })

  await prisma.$disconnect()

  res.end('ok')
}

const login = async (req, res) => {
  if (req.body.dev) {
    if (process.env.NEXT_PUBLIC_GIT_COMMIT_REF === 'main') {
      res.status(401).end('Unauthorized')
      return
    }

    const { email, redirect = '/home' } = req.body

    const prisma = new PrismaClient()
    await prisma.$connect()

    const user = await prisma.user.upsert({
      create: {
        email,
        roles: {
          connect: {
            name: 'user',
          },
        },
      },
      include: {
        roles: true,
        subscriptions: true,
      },
      update: {},
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
  } else {
    const prisma = new PrismaClient()
    await prisma.$connect()

    const { email, id, redirect } = await prisma.pass.findFirst({
      where: {
        code: req.body.code,
        expiredAt: {
          gte: new Date(),
        },
      },
    })

    if (email) {
      await prisma.pass.delete({
        where: {
          id,
        },
      })
    } else {
      await prisma.$disconnect()
      res.status(400).end('Bad Request')
    }

    const user = await prisma.user.upsert({
      create: {
        authenticatedAt: new Date(),
        email,
        roles: {
          connect: {
            name: 'user',
          },
        },
      },
      include: {
        roles: true,
        subscriptions: true,
      },
      update: {
        authenticatedAt: new Date(),
      },
      where: {
        email,
      },
    })

    await prisma.$disconnect()

    req.session.set('user', user)
    await req.session.save()

    res.json({ redirect, user })
  }
}

const handler = async (req, res) => {
  if (req.method == 'DELETE') {
    await destroy(req, res)
  } else if (req.method === 'POST') {
    await getStarted(req, res)
  } else if (req.method === 'PUT') {
    await login(req, res)
  }
}

export default withSession(handler)
