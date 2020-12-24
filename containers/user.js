import axios from 'axios'
import Cookie from 'js-cookie'
import { createContainer } from 'unstated-next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useContainer = () => {
  const { asPath, push } = useRouter()

  const [user, setUser] = useState()
  const [userCookie, setUserCookie] = useState()

  useEffect(() => {
    const cookie = Cookie.getJSON('content_public')
    setUserCookie(cookie ?? {})
  }, [asPath])

  const login = async (values) => {
    try {
      const { redirect, user } = await axios
        .put('/api/v1/user', values)
        .then((response) => response.data)

      Cookie.set('content_public', { email: user.email })

      setUser(user)
      setUserCookie({ email: user.email })

      push(redirect)
    } catch (error) {}
  }

  const logout = async () => {
    await axios.delete('/api/v1/user')

    Cookie.remove('content_public')

    setUser()
    setUserCookie()

    push('/login')
  }

  return { login, logout, setUser, user, userCookie }
}

export const { Provider: UserProvider, useContainer: useUser } = createContainer(useContainer)
