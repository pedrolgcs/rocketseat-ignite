import { ThumbsUp, Trash } from 'phosphor-react';
import {
  formatePublishedAt,
  formatePublishedDateRelative,
} from '../../utils/date';
import { Avatar } from '..';
import styles from './styles.module.css';

function Comment({ comment, onRemove }) {
  const { id, content, publishedAt } = comment;

  const publishedAtFormatted = formatePublishedAt(publishedAt);
  const publishedDateRelative = formatePublishedDateRelative(publishedAt);

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} url="https://github.com/pedrolgcs.png" />

      <div className={styles.box}>
        <div className={styles.content}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Pedro Henrique</strong>
              <time
                title={publishedAtFormatted}
                dateTime={publishedAt.toISOString()}
              >
                {publishedDateRelative}
              </time>
            </div>

            <button title="Deletar comentário" onClick={() => onRemove(id)}>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
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
