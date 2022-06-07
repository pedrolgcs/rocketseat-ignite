import * as React from 'react';
import {
  formatePublishedAt,
  formatePublishedDateRelative,
} from '../../utils/date';
import { Comment, Avatar } from '..';
import styles from './styles.module.css';

function Post({ author, content, publishedAt }) {
  const [comments, setComments] = React.useState([]);
  const [newCommentText, setNewCommentText] = React.useState('');

  const publishedAtFormatted = formatePublishedAt(publishedAt);
  const publishedDateRelative = formatePublishedDateRelative(publishedAt);

  function handleCreateNewComment(event) {
    event.preventDefault();

    const newComment = {
      id: Math.random().toString(),
      content: newCommentText,
      publishedAt: new Date(),
    };

    setComments([...comments, newComment]);

    setNewCommentText('');
  }

  function handleRemoveComment(commentId) {
    setComments(comments.filter((comment) => comment.id !== commentId));
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar url={author.avatarUrl} />
          <div className={styles.info}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedAtFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelative}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line, index) => {
          if (line.type === 'paragraph') {
            return <p key={String(index)}>{line.content}</p>;
          } else if (line.type === 'link') {
            return (
              <p key={String(index)}>
                <a href="">{line.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form className={styles.commentForm} onSubmit={handleCreateNewComment}>
        <strong>Deixe seu feedback</strong>

        <textarea
          value={newCommentText}
          onChange={(event) => setNewCommentText(event.target.value)}
          placeholder="Deixe seu comentário"
        />

        <div className={styles.submitButtonContainer}>
          <button type="submit">Publicar</button>
        </div>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onRemove={handleRemoveComment}
          />
        ))}
      </div>
    </article>
  );
}

export { Post };
