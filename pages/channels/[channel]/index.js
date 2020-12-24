import { LayoutChannel } from '~/components/layout'
import { PostShowcase } from '~/components/post'
import { PrismaClient } from '@prisma/client'

const Page = ({ channel, posts }) => {
  return (
    <LayoutChannel channel={channel}>
      <PostShowcase channel={channel} posts={posts} />
    </LayoutChannel>
  )
}

export const getStaticPaths = () => {
  return {
    fallback: 'blocking',
    paths: [],
  }
}

export const getStaticProps = async (context) => {
  const prisma = new PrismaClient()
  await prisma.$connect()

  const [channel, posts] = await Promise.all([
    prisma.channel.findUnique({
      where: {
        name: context.params.channel,
      },
    }),
    prisma.post.findMany({
      where: {
        channel: {
          name: context.params.channel,
        },
      },
    }),
  ])

  await prisma.$disconnect()

  return {
    props: {
      channel: JSON.parse(JSON.stringify(channel)),
      posts: JSON.parse(JSON.stringify(posts)),
    },
    revalidate: 1,
  }
}

export default Page
