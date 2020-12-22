import { createChannelLink } from "~/lib/channel";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="border-t w-full">
      <div className="max-w-5xl mx-auto">
        <div className="px-4 py-8 text-center">
          &copy;2020, all rights reserved. Powered by <Link href="/"><a className="hover:text-gray-500">Content.</a></Link>
        </div>
      </div>
    </div>
  );
};

export const LayoutChannel = ({ channel, children }) => {
  return (
    <div className="w-full">
      <div className="border-b w-full">
        <div className="flex max-w-3xl mx-auto">
          <div className="flex-1 my-auto p-4">
            <Link href={createChannelLink(channel)}>
              <a className="hover:text-gray-500">{channel.title}</a>
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
  return (
    <div className="w-full">
      <div className="border-b w-full">
        <div className="flex max-w-5xl mx-auto">
          <div className="px-4 py-6">Content</div>
        </div>
      </div>
      {children}
      <Footer />
    </div>
  );
};
