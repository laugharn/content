import { createContainer } from 'unstated-next'
import { slug } from 'cuid'
import { useEffect, useState } from 'react'
import { useProgress } from '~/lib/hook'
import { useRouter } from 'next/router'

const useContainer = () => {
  useProgress()
  const { asPath } = useRouter()

  useEffect(() => {
    setAlerts([])
  }, [asPath])

  const [alerts, setAlerts] = useState([])
  const [processing, setProcessing] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const createAlert = (alert) => {
    setAlerts([{ id: slug(), ...alert }])
  }

  const resetAlerts = () => setAlerts([])

  return {
    alerts,
    createAlert,
    processing,
    resetAlerts,
    setAlerts,
    setProcessing,
    setShowMenu,
    showMenu,
  }
}

export const { Provider: AppProvider, useContainer: useApp } = createContainer(useContainer)
