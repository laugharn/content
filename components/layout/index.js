import { createChannelLink } from '~/lib/channel'
import { IconInboxIn, IconMenuAlt } from '~/components/icon'
import Link from 'next/link'
import { useApp } from '~/containers/app'
import { useUser } from '~/containers/user'

const Footer = () => {
  const { userHomeLink } = useUser()

  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto">
        <div className="font-bold px-4 py-8 text-center text-gray-300">
          &copy;2020, all rights reserved. Powered by{' '}
          <Link href={userHomeLink}>
            <a className="text-black hover:text-gray-500">Content.</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export const LayoutChannel = ({ channel, children }) => {
  const { redirect } = useApp()
  const { isSubscribed } = useUser()

  const buttonUrl = isSubscribed(channel) ? '/home' : `/get-started?channel=${channel.name}&redirect=${redirect}`

  return (
    <div className="w-full">
      <User />
      <div className="flex max-w-3xl mx-auto w-full">
        <div className="my-auto p-4 w-1/3">
          <IconMenuAlt className="h-8 w-8" />
        </div>
        <div className="flex flex-1 justify-center leading-tighter lg:leading-normal my-auto p-4 text-center">
          <Link href={createChannelLink(channel)}>
            <a className="font-bold hover:text-gray-500">{channel.meta?.title}</a>
          </Link>
        </div>
        <div className="flex justify-end my-auto p-4 w-1/3">
          <Link href={buttonUrl}>
            <button
              className="bg-teal-300 hover:bg-teal-500 hidden lg:block leading-none p-4 rounded"
            >
              Subscribe
            </button>
          </Link>
          <Link href={buttonUrl}>
            <button
              className="lg:hidden text-teal-300 hover:text-teal-500"
            >
              <IconInboxIn className="h-8 w-8" />
            </button>
          </Link>
        </div>
      </div>
      {children}
      <Footer />
    </div>
  )
}

export const LayoutRoot = ({ children }) => {
  const { redirect } = useApp()
  const { userCookie, userHomeLink } = useUser()

  return (
    <div className="w-full">
      <User />
      <div className="flex max-w-5xl mx-auto w-full">
        <div className="my-auto p-4 w-1/3">
          <IconMenuAlt className="h-8 w-8" />
        </div>
        <div className="flex flex-1 justify-center my-auto p-4">
          <Link href={userHomeLink}>
            <a className="font-bold hover:text-gray-500">Content</a>
          </Link>
        </div>
        <div className="flex justify-end p-4 w-1/3">
          {userCookie?.email ? (
            <Link href="/create">
              <button className="bg-black hover:bg-gray-500 leading-none p-4 rounded text-white">
                Create
              </button>
            </Link>
          ) : (
            <Link href={`/get-started?redirect=${redirect}`}>
              <button className="bg-teal-300 hover:bg-teal-500 leading-none p-4 rounded">
                Get Started
              </button>
            </Link>
          )}
        </div>
      </div>
      {children}
      <Footer />
    </div>
  )
}

const User = () => {
  const { logout, userCookie } = useUser()

  return userCookie?.email ? (
    <div className="bg-black w-full">
      <div className="max-w-3xl mx-auto overflow-x-scroll p-4 text-center text-white">
        <button
          className="hover:text-gray-500"
          onClick={async () => {
            await logout()
          }}
        >
          Logout
        </button>
      </div>
    </div>
  ) : null
}
