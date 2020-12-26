import Link from 'next/link'
import { UserSignature } from '~/components/user'
import { useTimestamp } from '~/lib/hook'

export const Channel = ({ channel }) => {
  const timestamp = useTimestamp(channel.createdAt)

  return (
    <div className="w-full">
      <div className="p-4 w-full">
        <h2>
          <Link href={`/channels/${channel.name}`}>
            <a className="font-bold hover:text-gray-500">{channel.meta?.title}</a>
          </Link>
        </h2>
        <p className="text-gray-700">Founded {timestamp}</p>
      </div>
      {channel.meta?.description && (
        <div className="px-4 w-full">
          <p className="text-gray-500">{channel.meta?.description}.</p>
        </div>
      )}
      <UserSignature user={channel.owner} />
    </div>
  )
}

export const Channels = ({ channels }) => {
  return (
    <div className="flex flex-wrap w-full">
      {channels.map((channel, index) => {
        return (
          <div className="w-1/3" key={`channel-${channel.id}`}>
            <Channel channel={channel} />
          </div>
        )
      })}
    </div>
  )
}
