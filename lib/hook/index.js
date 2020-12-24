import NProgress from 'nprogress'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

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
