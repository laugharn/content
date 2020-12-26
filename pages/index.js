import { Channels } from '~/components/channel'
import { LayoutRoot } from '~/components/layout'
import { PrismaClient } from '@prisma/client'

const Page = ({ channels }) => {
  return (
    <LayoutRoot>
      <div className="flex flex-wrap max-w-5xl mx-auto py-4">
        <div className="flex flex-wrap py-4 w-full">
          <div className="p-4 w-1/2">
            <h1 className="font-bold leading-tighter text-4xl tracking-tight">
              The only place on the internet for content.
            </h1>
            <p className="text-lg text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vivamus.
            </p>
          </div>
          <div className="p-4 w-1/2">
            <div className="aspect-w-16 aspect-h-9 relative">
              <div className="absolute bg-black inset-0" />
            </div>
          </div>
        </div>
        <div className="font-bold leading-tighter max-w-5xl mx-auto p-4 text-4xl tracking-tight w-full">
          Content you can't find anywhere else.
        </div>
        <Channels channels={channels} />
      </div>
    </LayoutRoot>
  )
}

export const getStaticProps = async (context) => {
  const prisma = new PrismaClient()
  await prisma.$connect()

  const channels = await prisma.channel.findMany({
    include: {
      owner: true,
    },
  })

  await prisma.$disconnect()

  return {
    props: {
      channels: JSON.parse(JSON.stringify(channels)),
    },
    revalidate: 1,
  }
}

export default Page
