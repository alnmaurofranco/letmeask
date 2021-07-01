import styles from './roomCode.module.scss'
import { toast } from 'react-hot-toast';

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  function roomCodeToClipboard() {
    toast.promise(navigator.clipboard.writeText(`${window.location.origin}/rooms/${props.code}`), {
      loading: 'Carregando...',
      success: 'Copiado com sucesso!',
      error: 'Não foi possivel copiar.'
    }, {
      duration: 950,
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

  return (
    <button className={styles.roomCode} onClick={roomCodeToClipboard}>
      <div>
        <img src="/assets/images/copy.svg" alt="Copiar código da sala" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  )
}
