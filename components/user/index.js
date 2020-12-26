import { IconHappy } from '~/components/icon'

export const UserSignature = ({ user }) => {
  return (
    <div className="flex p-4 w-full">
      <IconHappy className="text-black h-12 w-12" />
      <div className="pl-2">
        <ul>
          <li>{user?.meta?.displayName}</li>
          <li className="text-gray-500">{user?.meta?.description}</li>
        </ul>
      </div>
    </div>
  )
}
