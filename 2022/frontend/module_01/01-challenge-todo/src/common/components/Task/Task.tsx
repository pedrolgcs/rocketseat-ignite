import * as React from 'react';
import { Trash, Circle, CheckCircle } from 'phosphor-react';
import { ITask } from '../../../models';
import styles from './styles.module.css';

type TaskProps = {
  task: ITask;
  onChange: (id: string) => void;
  onRemove: (id: string) => void;
};

const Task: React.FC<TaskProps> = ({ task, onChange, onRemove }) => {
  const { id, completed, content } = task;

  function handleRemove() {
    onRemove(id);
  }

  function handleChange() {
    onChange(id);
  }

  return (
    <li className={styles.container}>
      <div className={styles.checkbox} onClick={handleChange}>
        {completed ? (
          <>
            <span className={styles.cover} />
            <CheckCircle weight="fill" color="#5e60ce" size={20} />
          </>
        ) : (
          <Circle size={20} color="#4ea8de" />
        )}
      </div>

      <p className={completed ? styles.completedText : styles.text}>
        {content}
      </p>

      <button type="button" className={styles.delete} onClick={handleRemove}>
        <Trash />
      </button>
    </li>
  );
};

export { Task };
