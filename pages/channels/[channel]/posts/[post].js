import { components } from "~/components/content";
import { createChannel } from "~/lib/channel";
import { createPost } from "~/lib/post";
import { LayoutChannel } from "~/components/layout";
import { Post } from "~/components/post";
import renderToString from "next-mdx-remote/render-to-string";

const Page = ({ channel, post, source }) => {
  return (
    <LayoutChannel channel={channel}>
      <Post channel={channel} post={post} source={source} />
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
  const post = createPost();

  return {
    props: {
      channel: createChannel(),
      post,
      source: await renderToString(post.body, { components }),
    },
    revalidate: 1,
  };
};

export default Page;
