import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../../styles/room.module.scss'

import { Button } from '../../../components/Button/index';
import { RoomCode } from '../../../components/RoomCode/index';
import { Question } from '../../../components/Question';
import { useRoom } from '../../../hooks/useRoom';
import { database } from '../../../services/firebase';

type TRoomQuery = {
  id: string;
}

export default function AdminRoom() {
  const router = useRouter()
  const { id: roomId } = router.query as TRoomQuery

  const { questions, title } = useRoom(roomId)

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    router.push('/')
  }
  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  return (
    <div className={styles.page_room}>
      <Head>
        <title>Sala {title} | Letmeask</title>
      </Head>

      <header>
        <div className={styles.content}>
          <Link href="/">
            <img src="/assets/images/logo.svg" alt="LetMeAsk" />
          </Link>
          <div>
            <RoomCode code={roomId} />
            <Button
              isOutline
              onClick={handleEndRoom}
            >
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.roomTitle}>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className={styles.questionList}>
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src="/assets/images/delete.svg" alt="Remover pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}
