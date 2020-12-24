import mailgun from 'mailgun-js'

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: 'mail.family.computer',
})

export const handlePost = async (post, subscribers = []) => {
  const obj = {
    from: `${post.channel.meta?.title} <postmaster@sandboxc3b01bf9332c4e7db6b57d892bdffc4f.mailgun.org>`,
    subject: post.meta?.title ?? 'Untitled',
    text: post.body,
    to: `laugharn+content-channel-${post.channel.id}@gmail.com`,
  }

  if (subscribers.length > 0) {
      obj.bcc = subscribers.map((subscriber) => subscriber.email).join(',')
  }

  await mg.messages().send(obj)
}
