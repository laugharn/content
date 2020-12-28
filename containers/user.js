import axios from 'axios'
import Cookie from 'js-cookie'
import { createContainer } from 'unstated-next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useContainer = () => {
  const { asPath, push } = useRouter()

  const [user, setUser] = useState()
  const [userCookie, setUserCookie] = useState()

  const userHomeLink = userCookie?.email ? '/home' : '/'

  useEffect(() => {
    const cookie = Cookie.getJSON('content_public')
    setUserCookie(cookie ?? {})
  }, [asPath])

  const authenticate = (redirect, user) => {
    Cookie.set('content_public', { email: user.email })

    setUser(user)
    setUserCookie({ email: user.email })

    push(redirect)
  }

  const isSubscribed = channel => Boolean(user?.subscriptions.find(subscription => subscription.channelId === channel.id))

  const login = async (values) => {
    try {
      if (values.dev || values.code) {
        const { redirect, user } = await axios
          .put('/api/v1/user', values)
          .then((response) => response.data)

        authenticate(redirect, user)
      } else {
        await axios.post('/api/v1/user', values)
      }
    } catch (error) {}
  }

  const logout = async () => {
    await axios.delete('/api/v1/user')

    Cookie.remove('content_public')

    setUser()
    setUserCookie()

    push(`/get-started?redirect=${window.location.pathname}`)
  }

  return { authenticate, isSubscribed, login, logout, setUser, user, userCookie, userHomeLink }
}

export const { Provider: UserProvider, useContainer: useUser } = createContainer(useContainer)
