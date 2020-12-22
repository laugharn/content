import { createChannel } from "~/lib/channel";
import { createPosts } from "~/lib/post";
import { LayoutChannel } from "~/components/layout";
import { PostShowcase } from "~/components/post";

const Page = ({ channel, posts }) => {
  return (
    <LayoutChannel channel={channel}>
      <PostShowcase channel={channel} posts={posts} />
    </LayoutChannel>
  );
};

export const getStaticPaths = () => {
  return {
    fallback: "blocking",
    paths: [],
  };
};

export const getStaticProps = async (context) => {
  return {
    props: {
      channel: createChannel(),
      posts: createPosts(),
    },
    revalidate: 1,
  };
};

export default Page;
