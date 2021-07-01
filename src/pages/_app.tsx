import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast'
import '../styles/global.scss'
import '../services/firebase'

import { AuthProvider } from '../contexts/AuthContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </AuthProvider>
  );
}

export default App;
