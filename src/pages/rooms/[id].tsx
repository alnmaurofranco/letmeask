import { useRouter } from 'next/router';

import styles from '../../styles/room.module.scss'
import { Button } from '../../components/Button/index';
import { RoomCode } from '../../components/RoomCode/index';
import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

type TFirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}>

type TRoomQuery = {
  id: string;
}

type TQuestions = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}

export default function Room() {
  const { user } = useAuth()
  const router = useRouter()
  const [newQuestion, setNewQuestion] = useState('')
  const [questions, setQuestions] = useState<TQuestions[]>([])
  const [title, setTitle] = useState('')

  const { id: roomId } = router.query as TRoomQuery

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions = databaseRoom.questions ?? {} as TFirebaseQuestions

      const parsedQuestions =
        Object.entries(firebaseQuestions)
          .map(([key, value]: any) => {
            return {
              id: key,
              content: value.content,
              author: value.author,
              isAnswered: value.isAnswered,
              isHighlighted: value.isHighlighted
            }
          })

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })

  }, [roomId])

  async function handleSendQuestion(e: FormEvent) {
    e.preventDefault()

    if (newQuestion.trim() === '')
      return

    if (!user) {
      throw new Error('You must be logged in.')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false,
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)

    setNewQuestion('')
  }

  return (
    <div className={styles.page_room}>
      <header>
        <div className={styles.content}>
          <img src="/assets/images/logo.svg" alt="LetMeAsk" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.roomTitle}>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={e => setNewQuestion(e.target.value)}
            value={newQuestion}
          />

          <div className={styles.formFooter}>
            {user ? (
              <div className={styles.userInfo}>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            )}

            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>

        {questions.length > 0 ? JSON.stringify(questions) : <p>Não existe pergunta no momento.</p>}
      </main>
    </div>
  )
}
