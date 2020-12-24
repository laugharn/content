import { components } from '~/components/content'
import { LayoutChannel } from '~/components/layout'
import { Post } from '~/components/post'
import { PrismaClient } from '@prisma/client'
import renderToString from 'next-mdx-remote/render-to-string'

const Page = ({ channel, post, source }) => {
  return (
    <LayoutChannel channel={channel}>
      <Post channel={channel} post={post} source={source} />
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
  const arr = context.params.post.split('-')
  const id = arr[arr.length - 1]

  const prisma = new PrismaClient()
  await prisma.$connect()

  const [channel, post] = await Promise.all([
    prisma.channel.findUnique({
      where: {
        name: context.params.channel,
      },
    }),
    prisma.post.findFirst({
      include: {
        user: true,
      },
      where: {
        channel: {
          name: context.params.channel,
        },
        id: parseInt(id),
      },
    }),
  ])

  await prisma.$disconnect()

  return {
    props: {
      channel: JSON.parse(JSON.stringify(channel)),
      post: JSON.parse(JSON.stringify(post)),
      source: await renderToString(post.body, { components }),
    },
    revalidate: 1,
  }
}

export default Page
