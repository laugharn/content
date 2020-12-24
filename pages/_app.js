import { AppProvider } from '~/containers/app'
import { UserProvider } from '~/containers/user'

import '~/styles/app.css'

const App = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </AppProvider>
  )
}

export default App
