import { UserProvider } from "~/containers/user";

import "~/styles/app.css";

const App = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default App;
