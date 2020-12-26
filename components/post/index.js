import { Content } from '../content'
import { IconHappy } from '~/components/icon'
import { kebabCase } from 'lodash'
import Link from 'next/link'
import { useTimestamp } from '~/lib/hook'

export const Post = ({ channel, post, source }) => {
  const timestamp = useTimestamp(post.createdAt)

  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="p-4 w-full">
        <h1>
          <Link href={`/channels/${channel.name}/posts/${post.id}`}>
            <a className="font-bold leading-tight hover:text-gray-500 text-4xl tracking-tight">
              {post.meta?.title}
            </a>
          </Link>
        </h1>
        {post.meta?.description && (
          <p className="text-gray-700 text-lg">{post.meta?.description}</p>
        )}
      </div>
      <div className="flex p-4">
        <IconHappy className="text-black h-12 w-12" />
        <div className="pl-2">
          <ul>
            <li className="font-bold">{post.user?.meta?.displayName}</li>
            <li className="text-gray-500">{timestamp}</li>
          </ul>
        </div>
      </div>
      <div className="p-4 w-full">
        <Content source={source} />
      </div>
    </div>
  )
}

export const PostPreview = ({ channel, post }) => {
  return (
    <div className="flex flex-wrap w-full">
      <div className="p-4 w-1/3">
        <img className="block w-full" src={post.meta?.image} />
      </div>
      <div className="p-4 w-2/3">
        <h2>
          <Link href={`/channels/${channel.name}/posts/${kebabCase(post.meta?.title)}-${post.id}`}>
            <a className="font-bold leading-tight text-xl tracking-tight hover:text-gray-500">
              {post.meta?.title}
            </a>
          </Link>
        </h2>
        {post.meta?.description && <p className="text-gray-700">{post.meta?.description}</p>}
        <p className="mt-4 text-gray-300">Dec 21, 2020</p>
      </div>
    </div>
  )
}

export const PostShowcase = ({ channel, posts }) => {
  const [showcasePost, ...otherPosts] = posts

  return (
    <div className="w-full">
      {showcasePost && <ShowcasePost channel={channel} post={showcasePost} />}
      <div className="max-w-3xl mx-auto py-4">
        {otherPosts.map((post) => {
          return <PostPreview channel={channel} key={`post-${post.id}`} post={post} />
        })}
      </div>
    </div>
  )
}

const ShowcasePost = ({ channel, post }) => {
  const timestamp = useTimestamp(post.createdAt)

  return (
    <div className="flex flex-wrap max-w-3xl mx-auto py-4">
      <div className="p-4 w-1/2">
        <img className="block w-full" src={post.meta?.image} />
      </div>
      <div className="p-4 w-1/2">
        <h2>
          <Link href={`/channels/${channel.name}/posts/${kebabCase(post.meta?.title)}-${post.id}`}>
            <a className="font-bold leading-tight text-2xl tracking-tight hover:text-gray-500">
              {post.meta?.title}
            </a>
          </Link>
        </h2>
        {post.meta?.description && <p className="text-gray-700">{post.meta?.description}</p>}
        <p className="mt-4 text-gray-300">{timestamp}</p>
      </div>
    </div>
  )
}
