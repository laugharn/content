import { withIronSession } from 'next-iron-session'

export const withSession = (handler) => {
  const config = {
    password: [
      {
        id: 1,
        password: process.env.SECRET_COOKIE_PASSWORD_1,
      },
    ],
    cookieName: 'content_dev',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  }

  return withIronSession(handler, config)
}
