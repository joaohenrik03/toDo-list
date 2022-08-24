import { useState } from "react";
import { useForm } from "react-hook-form";

import { Header } from "./components/Header/Header";
import { Task } from "./components/Task/Task";

import Clipboard from "./assets/clipboard.png";
import PlusIcon from "./assets/plus.svg";

import styles from "./App.module.css";

type NewTaskTextData = {
  newTaskText: string;
};

export function App() {
  const { register, handleSubmit, reset } = useForm<NewTaskTextData>();

  const [toDoList, setToDoList] = useState<string[]>([]);

  const [completeTasks, setCompleteTasks] = useState(0);

  function handleAddNewTaskToList(data: NewTaskTextData) {
    const newTodoList = [...toDoList, data.newTaskText];
    setToDoList(newTodoList);

    reset();
  };

  function onDeleteTask(taskToDelete: string) {
    const newTodoList = toDoList.filter((task) => {
      return task !== taskToDelete
    });

    setToDoList(newTodoList);
  };

  function onSetCompleteTasks(cont: number) {
    setCompleteTasks(completeTasks + cont);
  };

  function onReduceTheNumberOfCompletedTasks() {
    setCompleteTasks(completeTasks - 1);
  };

  return (
    <>
      <Header />

      <main className={styles.main}>
        <form 
          onSubmit={handleSubmit(handleAddNewTaskToList)} 
          className={styles.form}
        >
          <input 
            type="text" 
            placeholder='Adicione uma nova tarefa'
            required
            {...register('newTaskText', { required: true })}
          />

          <button type='submit'>
            Criar
            <img 
              src={PlusIcon} 
              alt="+" 
            />
          </button>
        </form>  

        <section>
          <header className={styles.header}>
            <div className={styles.createdTasks}>
              <strong>
                Tarefas criadas 
                <span>{toDoList.length}</span>
              </strong>
            </div>

            <div className={styles.completeTasks}>
              <strong>
                Concluídas 
                <span>{toDoList.length === 0 ? '0' : `${completeTasks} de ${toDoList.length}`}</span>
              </strong>
            </div>
          </header>   
          
          <div className={styles.taskListContainer}>
            {
              toDoList.length === 0 ? (
                <div className={styles.noTaskOnTheList}>
                  <img src={Clipboard} alt="Lista vazia" />

                  <div>
                    <strong>
                      Você ainda não tem tarefas cadastradas
                    </strong>
                    <span>
                      Crie tarefas e organize seus itens a fazer
                    </span>
                  </div>
                </div>
              ) : (
                toDoList.map(task => {
                  return (
                    <Task 
                      key={task}
                      task={task}
                      onDeleteTask={onDeleteTask}
                      onSetCompleteTasks={onSetCompleteTasks}
                      reduceTheNumberOfCompletedTasks={onReduceTheNumberOfCompletedTasks}
                    />
                  )
                })  
              )
            }
          </div>
        </section>
      </main>
    </>
  )
}
