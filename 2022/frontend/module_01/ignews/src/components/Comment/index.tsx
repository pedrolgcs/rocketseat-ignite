import { ThumbsUp, Trash } from 'phosphor-react';
import {
  formatePublishedAt,
  formatePublishedDateRelative,
} from '../../utils/date';
import { Avatar } from '..';
import styles from './styles.module.css';
import { IComment } from '../../models';

type CommentProps = {
  comment: IComment;
  onDeleteComment: (id: string) => void;
  onUpdateCommentLike: (id: string) => void;
};

function Comment({
  comment,
  onDeleteComment,
  onUpdateCommentLike,
}: CommentProps) {
  const { id, content, likes, publishedAt } = comment;

  const publishedAtFormatted = formatePublishedAt(publishedAt);
  const publishedDateRelative = formatePublishedDateRelative(publishedAt);

  function handleDeleteComment() {
    onDeleteComment(id);
  }

  function handleUpdateCommentLike() {
    onUpdateCommentLike(id);
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/pedrolgcs.png" />

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

            <button title="Deletar comentário" onClick={handleDeleteComment}>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleUpdateCommentLike}>
            <ThumbsUp />
            Aplaudir <span>{likes}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}

export { Comment };
