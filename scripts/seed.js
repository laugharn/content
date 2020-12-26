const faker = require('faker')
const { PrismaClient } = require('@prisma/client')
const { upperFirst } = require('lodash')

const createChannel = () => {
  const postBody = faker.lorem.paragraphs(5)
  const categoryName = faker.random.word().toLowerCase()

  return {
    categories: {
      connectOrCreate: [{ create: { name: categoryName }, where: { name: categoryName } }],
    },
    meta: {
      description: upperFirst(faker.lorem.words(12)),
      image: `https://via.placeholder.com/800x450/${faker.internet
        .color()
        .replace('#', '')}/ffffff`,
      title: faker.name.jobTitle(),
    },
    name: faker.random.word().toLowerCase(),
    posts: {
      create: {
        body: postBody,
        meta: {
          description: `${upperFirst(faker.lorem.words(12))}.`,
          image: `https://via.placeholder.com/800x450/${faker.internet
            .color()
            .replace('#', '')}/ffffff`,
          title: faker.random
            .words(4)
            .split(' ')
            .map((word) => upperFirst(word))
            .join(' '),
        },
        revisions: [faker.lorem.paragraphs(5), postBody],
        status: 'published',
        user: {
          create: {
            email: faker.internet.email(),
            meta: {
              displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
            },
          },
        },
      },
    },
  }
}

const createChannels = (length = 5) => {
  return [...Array(length)].map(() => {
    return createChannel()
  })
}

const init = async () => {
  const prisma = new PrismaClient()
  await prisma.$connect()

  for (const name of ['creator', 'subscriber', 'user']) {
    await prisma.role.create({
      data: {
        name,
      },
    })
  }

  for (const channel of [...Array(3)]) {
    const email = faker.internet.email()
    const name = faker.random.word().toLowerCase()

    await prisma.channel.create({
      data: {
        meta: {
          description: upperFirst(faker.lorem.words(12)),
          title: faker.random
            .words(2)
            .split(' ')
            .map((word) => upperFirst(word))
            .join(' '),
        },
        name,
        owner: {
          create: {
            email,
            meta: {
              description: faker.name.jobTitle(),
              displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
            },
            roles: {
              connect: [{ name: 'creator' }, { name: 'user' }],
            },
          },
        },
      },
    })

    await prisma.post.create({
      data: {
        body: faker.lorem.paragraphs(5),
        channel: {
          connect: {
            name,
          },
        },
        meta: {
          description: `${upperFirst(faker.lorem.words(12))}.`,
          image: `https://via.placeholder.com/800x450/${faker.internet
            .color()
            .replace('#', '')}/ffffff`,
          title: faker.random
            .words(4)
            .split(' ')
            .map((word) => upperFirst(word))
            .join(' '),
        },
        status: 'published',
        user: {
          connect: {
            email,
          }
        }
      },
    })
  }

  await prisma.$disconnect()
}

init()
