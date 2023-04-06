import * as React from 'react';
import { v4 } from 'uuid';
import { PlusCircle, ClipboardText } from 'phosphor-react';
import { ITask } from './models';
import { Header, Badge, Task } from './common/components';
import styles from './styles/app.module.css';

function App() {
  const [tasks, setTasks] = React.useState<ITask[]>([]);
  const [task, setTask] = React.useState('');

  function handleCreateNewTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newTask: ITask = {
      id: v4(),
      content: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setTask('');
  }

  const doneTasksLength = tasks.filter((task) => task.completed).length;

  function changeStatusTask(id: string) {
    const updatedTask = tasks.find((task) => task.id === id);

    if (updatedTask) updatedTask.completed = !updatedTask.completed;

    setTasks([...tasks]);
  }

  function removeTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <>
      <Header />

      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleCreateNewTask}>
          <input
            type="text"
            name="new-todo"
            placeholder="Adicione uma nova tarefa"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button type="submit" disabled={task.length === 0}>
            Criar
            <PlusCircle size={20} />
          </button>
        </form>

        <div className={styles.tasks}>
          <div className={styles.info}>
            <div className={styles.created}>
              Tarefas criadas <Badge>{tasks.length}</Badge>
            </div>

            <div className={styles.done}>
              Concluídas
              <Badge>
                {doneTasksLength} {tasks.length > 0 && <>de {tasks.length}</>}
              </Badge>
            </div>
          </div>

          <ul className={styles.list}>
            {tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onChange={changeStatusTask}
                onRemove={removeTask}
              />
            ))}
          </ul>

          {!tasks.length && (
            <div className={styles.empty}>
              <ClipboardText />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export { App };
