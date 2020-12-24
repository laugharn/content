import { format } from 'date-fns'
import Link from 'next/link'

export const Channel = ({ channel, showBorder = true }) => {
  return (
    <div className="flex flex-wrap w-full">
      <div className="p-4 w-1/3">
        <img className="block w-full" src={channel.meta?.image} />
      </div>
      <div className="p-4 w-2/3">
        <h2>
          <Link href={`/channels/${channel.name}`}>
            <a className="font-bold leading-tight text-xl tracking-tight hover:text-gray-500">
              {channel.meta?.title}
            </a>
          </Link>
        </h2>
        <p className="mb-2 text-gray-700">
          by {channel.owner?.meta?.displayName} • {format(new Date(), 'MM/yy')}
        </p>
        {channel.meta?.description && <p className="text-gray-500">{channel.meta?.description}.</p>}
      </div>
      {showBorder && (
        <div className="px-4 w-full">
          <div className="border-b w-full" />
        </div>
      )}
    </div>
  )
}

export const Channels = ({ channels }) => {
  return (
    <>
      {channels.map((channel, index) => {
        return (
          <Channel
            channel={channel}
            key={`channel-${channel.id}`}
            showBorder={index != channels.length - 1}
          />
        )
      })}
    </>
  )
}
