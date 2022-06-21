import * as React from 'react';
import {
  formatePublishedAt,
  formatePublishedDateRelative,
} from '../../utils/date';
import { Comment, Avatar } from '..';
import { IPost, IComment } from '../../models';
import styles from './styles.module.css';

type PostProps = {
  post: IPost;
};

function Post({ post }: PostProps) {
  const { author, content, publishedAt } = post;

  const [comments, setComments] = React.useState<IComment[]>([]);
  const [newCommentText, setNewCommentText] = React.useState('');

  const publishedAtFormatted = formatePublishedAt(publishedAt);
  const publishedDateRelative = formatePublishedDateRelative(publishedAt);

  // update the comment text
  function handleNewCommentChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  // create a new comment
  function handleCreateNewComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newComment = {
      id: Math.random().toString(),
      content: newCommentText,
      publishedAt: new Date(),
      likes: 0,
    };

    setComments([...comments, newComment]);

    setNewCommentText('');
  }

  // remove comment
  function deleteComment(commentId: string) {
    setComments(comments.filter((comment) => comment.id !== commentId));
  }

  // update likes
  function updateCommentLike(commentId: string) {
    const comment = comments.find((comment) => comment.id === commentId);
    if (comment) comment.likes += 1;
    setComments([...comments]);
  }

  // utils
  const isNewCommentEmpty = newCommentText.trim().length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
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
        {content.map((line) => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === 'link') {
            return (
              <p key={line.content}>
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
          onChange={handleNewCommentChange}
          placeholder="Deixe seu comentário"
        />

        <div className={styles.submitButtonContainer}>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </div>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onDeleteComment={deleteComment}
            onUpdateCommentLike={updateCommentLike}
          />
        ))}
      </div>
    </article>
  );
}

export { Post };
