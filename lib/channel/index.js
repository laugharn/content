export const createChannelLink = (channel) => {
  if (process.env.NEXT_PUBLIC_GIT_COMMIT_REF != 'main') {
    return `/channels/${channel.name}`
  }
}
