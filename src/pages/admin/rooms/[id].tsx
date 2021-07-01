import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Modal from "react-modal";
import styles from '../../../styles/room.module.scss'

import { Button } from '../../../components/Button/index';
import { RoomCode } from '../../../components/RoomCode/index';
import { Question } from '../../../components/Question';
import { useRoom } from '../../../hooks/useRoom';
import { database } from '../../../services/firebase';
import { toast } from 'react-hot-toast';

type TRoomQuery = {
  id: string;
}

export default function AdminRoom() {
  const router = useRouter()
  const { id: roomId } = router.query as TRoomQuery

  const { questions, title } = useRoom(roomId)
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    router.push('/')
  }
  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
      toast.success('Pergunta excluida!', {
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

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
    toast.success('Pergunta respondida', {
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

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    })
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
              onClick={() => setIsModalOpen(true)}
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
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src="/assets/images/check.svg" alt="Marcar pergunta como respondida" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src="/assets/images/answer.svg" alt="Dar destaque á pergunta" />
                    </button>
                  </>
                )}

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
      <>
        <Modal
          isOpen={isModalOpen}
          ariaHideApp={false}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Deseja mesmo excluir o comentário?"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            },
            content: {
              position: "initial",
              width: "37rem",
              maxWidth: "90vw",
              height: "23rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "0",
              border: "none",
              background: "transparent",
            },
          }}
        >
          <div className={styles.excludeModal}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.66 18.3398L18.34 29.6598"
                stroke="#E73F5D"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M29.66 29.6598L18.34 18.3398"
                stroke="#E73F5D"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 42V42C14.058 42 6 33.942 6 24V24C6 14.058 14.058 6 24 6V6C33.942 6 42 14.058 42 24V24C42 33.942 33.942 42 24 42Z"
                stroke="#E73F5D"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <b>Encerrar a sala</b>
            <p>Tem certeza que você quer encerrar sala?</p>
            <div>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </button>
              <button type="button" onClick={handleEndRoom}>
                Sim, encerrar
              </button>
            </div>
          </div>
        </Modal>
      </>
    </div>
  )
}
