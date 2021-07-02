import Head from 'next/head'
import styles from '../styles/auth.module.scss'
import { Button } from '../components/Button';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';
import { toast } from 'react-hot-toast'
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    router.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode === '') {
      toast('Preencha o código da sala', {
        style: {
          height: '60px',
          borderRadius: 8,
          background: '#835afd',
          padding: '0 32px',
          color: '#fff',
          fontWeight: 500
        }
      })
      return
    }

    try {
      const roomRef = await database.ref(`rooms/${roomCode}`).get()

      if (!roomRef.exists()) {
        toast('Sala não existe', {
          style: {
            height: '50px',
            borderRadius: 8,
            background: '#835afd',
            padding: '0 32px',
            color: '#fff',
            fontWeight: 500
          }
        })
        return
      }

      if (roomRef.val().endedAt) {
        toast('Sala está fechada!', {
          style: {
            height: '50px',
            borderRadius: 8,
            background: '#835afd',
            padding: '0 32px',
            color: '#fff',
            fontWeight: 500
          }
        })
        return
      }

      router.push(`/rooms/${roomCode}`)
    } catch (error) {
      toast.error('Ocorreu um erro', {
        style: {
          height: '50px',
          borderRadius: 8,
          background: '#835afd',
          padding: '0 32px',
          color: '#fff',
          fontWeight: 500
        }
      })
    }
  }

  return (
    <div className={styles.page_auth}>
      <Head>
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
          {!user ? (
            <>
              <button onClick={handleCreateRoom} className={styles.createRoom}>
                <img src="/assets/images/google-icon.svg" alt="Logo do google" />
                Crie sua sala com o Google
              </button>
              <div className={styles.separator}>ou entre em uma sala</div>
              <form onSubmit={handleJoinRoom}>
                <input
                  type="text"
                  name="roomName"
                  id="roomName"
                  placeholder="Digite o código da sala"
                  onChange={event => setRoomCode(event.target.value)}
                  value={roomCode}
                />
                <Button type="submit">Entrar na sala</Button>
              </form>
            </>
          ) : (
            <>
              <h2>Entrar em uma sala</h2>
              <form onSubmit={handleJoinRoom}>
                <input
                  type="text"
                  name="roomName"
                  id="roomName"
                  placeholder="Digite o código da sala"
                  onChange={event => setRoomCode(event.target.value)}
                  value={roomCode}
                />
                <Button
                  type="submit"
                  disabled={false}
                >Entrar na sala</Button>
              </form>
              <p>Quer criar uma sala ?
                <Link href="/rooms/new">
                  <a> Clique aqui</a>
                </Link>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
