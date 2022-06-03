import { ThumbsUp, Trash } from 'phosphor-react';
import styles from './styles.module.css';

function Comment() {
  return (
    <div className={styles.comment}>
      <img src="https://github.com/pedrolgcs.png" />

      <div className={styles.box}>
        <div className={styles.content}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Pedro Henrique</strong>
              <time title="11 de Maio às 08:13" dateTime="2022-05-11 08:13:30">
                Cerca de 1h atrás
              </time>
            </div>

            <button title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>Muito bom Devon, parabéns!! 👏👏</p>
        </div>

        <footer>
          <button>
            <ThumbsUp />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  );
}

export { Comment };
