import { formatDistance } from 'date-fns'
import NProgress from 'nprogress'
import { upperFirst } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

export const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

// Show a loading bar when we navigate through the site
export const useProgress = () => {
  const { events } = useRouter()

  const [pushing, setPushing] = useState(false)

  // Listen to the Next router events and set the pushing state accordingly
  useEffect(() => {
    events.on('routeChangeComplete', () => {
      setPushing(false)
    })
    events.on('routeChangeError', () => {
      setPushing(false)
    })
    events.on('routeChangeStart', () => {
      setPushing(true)
    })
  }, [])

  // If we're pushing, begin NProgress, otherwise say routing is done
  useEffect(() => {
    pushing ? NProgress.start() : NProgress.done()
  }, [pushing])
}

export const useTimestamp = (value, interval = 15000) => {
  const [timestamp, setTimestamp] = useState()

  useInterval(() => {
    setTimestamp(formatDistance(new Date(value), new Date()))
  }, interval)

  useEffect(() => {
    setTimestamp(formatDistance(new Date(value), new Date()))
  }, [value])

  return value ? `${upperFirst(timestamp)} ago` : ''
}
