import { AppProps } from 'next/app';

import '../styles/global.scss'
import '../services/firebase'

import { AuthProvider } from '../contexts/AuthContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
