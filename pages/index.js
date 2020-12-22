import { Channels } from "~/components/channel";
import { createChannels } from "~/lib/channel";
import { LayoutRoot } from "~/components/layout";

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
  return {
    props: {
      channels: createChannels(),
    },
    revalidate: 1,
  };
};

export default Page;
