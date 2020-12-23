import { Channels } from "~/components/channel";
import { LayoutRoot } from "~/components/layout";
import { PrismaClient } from "@prisma/client";

const Page = ({ channels }) => {
  return (
    <LayoutRoot>
      <div className="flex flex-wrap max-w-5xl mx-auto py-4">
        <div className="w-3/4">
          <Channels channels={channels} />
        </div>
      </div>
    </LayoutRoot>
  );
};

export const getStaticProps = async (context) => {
  const prisma = new PrismaClient();
  await prisma.$connect()

  const channels = await prisma.channel.findMany({
    include: {
      owner: true,
    }
  });

  await prisma.$disconnect()

  return {
    props: {
      channels: JSON.parse(JSON.stringify(channels)),
    },
    revalidate: 1,
  };
};

export default Page;
