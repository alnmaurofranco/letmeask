import { FormEvent, useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'

import styles from '../../styles/auth.module.scss'
import { Button } from '../../components/Button';
import { database } from '../../services/firebase';

import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/router';

export default function NewRoom() {
  const router = useRouter()
  const { user } = useAuth()
  const [newRoom, setNewRoom] = useState('')

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()

    if (newRoom.trim() === '') {
      return
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })

    router.push(`/admin/rooms/${firebaseRoom.key}`)
  }

  return (
    <div className={styles.page_auth}>
      <Head>
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
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              name="newRoom"
              id="newRoom"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
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
