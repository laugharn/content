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
          connect: {
            email: 'laugharn@gmail.com',
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

  const user = await prisma.user.create({
    data: {
      channels: {
        create: createChannels(),
      },
      email: 'laugharn@gmail.com',
      meta: {
        displayName: 'Dan Laugharn',
      },
    },
  })

  await prisma.$disconnect()
}

init()
