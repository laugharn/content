import { createChannelLink } from '~/lib/channel'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
  return (
    <div className="w-full">
      <User />
      <div className="w-full">
        <div className="flex max-w-3xl mx-auto">
          <div className="flex-1 my-auto p-4">
            <Link href={createChannelLink(channel)}>
              <a className="font-bold hover:text-gray-500">{channel.meta?.title}</a>
            </Link>
          </div>
          <div className="p-4">
            <button
              className="bg-black hover:bg-gray-500 leading-none p-4 rounded text-white"
              onClick={() => {
                alert(`I don't do anything!`)
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
      {children}
      <Footer />
    </div>
  )
}

export const LayoutRoot = ({ children }) => {
  const { asPath } = useRouter()
  const { userCookie, userHomeLink } = useUser()

  return (
    <div className="w-full">
      <User />
      <div className="w-full">
        <div className="flex max-w-5xl mx-auto">
          <div className="flex-1 my-auto p-4">
            <Link href={userHomeLink}>
              <a className="font-bold hover:text-gray-500">Content</a>
            </Link>
          </div>
          <div className="p-4">
            {!userCookie?.email && <Link href={`/signup?redirect=${asPath === '/' ? '/home' : asPath}`}>
                <button className="bg-teal-300 hover:bg-gray-500 leading-none mr-4 p-4 rounded">
                  Sign Up
                </button>
              </Link>}
            {userCookie?.email ? (
              <Link href="/create">
                <button className="bg-black hover:bg-gray-500 leading-none p-4 rounded text-white">
                  Create
                </button>
              </Link>
            ) : (
              <Link href={`/login?redirect=${asPath === '/' ? '/home' : asPath}`}>
                <button className="bg-black hover:bg-gray-500 leading-none p-4 rounded text-white">
                  Login
                </button>
              </Link>
            )}
          </div>
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
