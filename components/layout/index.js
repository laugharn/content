import { createChannelLink } from "~/lib/channel";
import Link from "next/link";
import { useUser } from "~/containers/user";

const Footer = () => {
  return (
    <div className="border-t w-full">
      <div className="max-w-5xl mx-auto">
        <div className="px-4 py-8 text-center">
          &copy;2020, all rights reserved. Powered by{" "}
          <Link href="/">
            <a className="hover:text-gray-500">Content.</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const LayoutChannel = ({ channel, children }) => {
  return (
    <div className="w-full">
      <User />
      <div className="border-b w-full">
        <div className="flex max-w-3xl mx-auto">
          <div className="flex-1 my-auto p-4">
            <Link href={createChannelLink(channel)}>
              <a className="hover:text-gray-500">{channel.meta?.title}</a>
            </Link>
          </div>
          <div className="p-4">
            <button
              className="bg-black hover:bg-gray-500 leading-none p-4 rounded text-white"
              onClick={() => {
                alert(`I don't do anything!`);
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
  );
};

export const LayoutRoot = ({ children }) => {
  const { userCookie } = useUser();

  return (
    <div className="w-full">
      <User />
      <div className="border-b w-full">
        <div className="flex max-w-5xl mx-auto">
          <div className="flex-1 my-auto p-4">
            <Link href="/">
              <a className="font-bold hover:text-gray-500">Content</a>
            </Link>
          </div>
          <div className="p-4">
            {userCookie?.email ? (
              <Link href="/create">
                <button className="bg-black hover:bg-gray-500 leading-none p-4 rounded text-white">
                  Create
                </button>
              </Link>
            ) : (
              <Link href="/login">
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
  );
};

const User = () => {
  const { logout, userCookie } = useUser();

  return userCookie?.email ? (
    <div className="bg-black w-full">
      <div className="max-w-3xl mx-auto overflow-x-scroll p-4 text-center text-white">
        <button
          className="hover:text-gray-500"
          onClick={async () => {
            await logout();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  ) : null;
};
