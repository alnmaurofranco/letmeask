import Head from 'next/head'
import styles from '../styles/auth.module.scss'
import { Button } from '../components/Button';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    router.push('/rooms/new');
  }

  return (
    <div className={styles.page_auth}>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png" />
        <link rel="manifest" href="/assets/images/site.webmanifest" />
        <link rel="mask-icon" href="/assets/images/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <title>LetMeAsk</title>
      </Head>

      <aside>
        <img src="/assets/images/illustration.svg" alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real.</p>
      </aside>

      <main>
        <div className={styles.mainContent}>
          <img src="/assets/images/logo.svg" alt="LetMeAsk" />
          <button onClick={handleCreateRoom} className={styles.createRoom}>
            <img src="/assets/images/google-icon.svg" alt="Logo do google" />
            Crie sua sala com o Google
          </button>
          <div className={styles.separator}>ou entre em uma sala</div>
          <form>
            <input
              type="text"
              name="roomName"
              id="roomName"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
