import { createContext, useState, useEffect, ReactNode } from 'react';
import { auth, firebase } from '../services/firebase'

type TUser = {
  id: string;
  name: string;
  avatar: string;
}

type TAuthContextState = {
  user: TUser | undefined;
  signInWithGoogle: () => Promise<void>;
}

type TAuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as TAuthContextState);

export const AuthProvider: React.FC<TAuthContextProviderProps> = ({ children }) => {

  const [user, setUser] = useState<TUser>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const response = await auth.signInWithPopup(provider);

    if (response.user) {
      const { displayName, photoURL, uid } = response.user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}
