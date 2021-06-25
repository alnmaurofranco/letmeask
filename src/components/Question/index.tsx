import { ReactNode } from 'react';
import styles from './question.module.scss'

type TQuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export function Question({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children
}: TQuestionProps) {
  return (
    <div
      className={`
      ${styles.question}
      ${isHighlighted && !isAnswered ? styles.highlighted : isAnswered ? styles.answered : ''}`}
    >
      <p>{content}</p>
      <footer>
        <div className={styles.userInfo}>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}
