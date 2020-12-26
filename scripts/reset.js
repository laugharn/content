const { PrismaClient } = require('@prisma/client')

const tableNames = [
  '_CategoryToChannel',
  '_RoleToUser',
  'Category',
  'Channel',
  'Pass',
  'Post',
  'Role',
  'Subscription',
  'User',
]

const reset = async () => {
  const prisma = new PrismaClient()
  await prisma.$connect()

  try {
    for (const tableName of tableNames) {
      try {
        await prisma.$queryRaw(`DELETE FROM "${tableName}";`)
      } catch (error) {}
    }
  } catch (err) {
    console.error(err)
  } finally {
    await prisma.$disconnect()
  }
}

reset()
