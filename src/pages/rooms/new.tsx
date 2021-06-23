import Link from 'next/link'
import Head from 'next/head'

import styles from '../../styles/auth.module.scss'
import { Button } from '../../components/Button';

import { useAuth } from '../../hooks/useAuth';

export default function NewRoom() {
  const { user } = useAuth()

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
        <title>LetMeAsk | Ciar nova sala</title>
      </Head>

      <aside>
        <img src="/assets/images/illustration.svg" alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real.</p>
      </aside>

      <main>
        <div className={styles.mainContent}>
          <img src="/assets/images/logo.svg" alt="LetMeAsk" />
          <h2>Criar uma nova sala</h2>
          <form>
            <input
              type="text"
              name="roomName"
              id="roomName"
              placeholder="Nome da sala"
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>Quer entrar em uma sala existente?
            <Link href="/">
              <a> Clique aqui</a>
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
