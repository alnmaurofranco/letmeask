import styles from './roomCode.module.scss'

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  function roomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button className={styles.roomCode} onClick={roomCodeToClipboard}>
      <div>
        <img src="/assets/images/copy.svg" alt="Copiar código da sala" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  )
}
