import { createContainer } from 'unstated-next'
import { slug } from 'cuid'
import { useEffect, useState } from 'react'
import { useProgress } from '~/lib/hook'
import { useRouter } from 'next/router'

const useContainer = () => {
  const { asPath } = useRouter()

  const [alerts, setAlerts] = useState([])
  const [processing, setProcessing] = useState(false)
  const [redirect, setRedirect] = useState()
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    setAlerts([])

    if (asPath) {
      setRedirect(asPath === '/' ? '/home' : window.location.pathname)
    }
  }, [asPath])

  useProgress()

  const createAlert = (alert) => {
    setAlerts([{ id: slug(), ...alert }])
  }

  const resetAlerts = () => setAlerts([])

  return {
    alerts,
    createAlert,
    processing,
    redirect,
    resetAlerts,
    setAlerts,
    setProcessing,
    setShowMenu,
    showMenu,
  }
}

export const { Provider: AppProvider, useContainer: useApp } = createContainer(useContainer)
