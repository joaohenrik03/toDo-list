import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from "react"
import { Header } from "./components/Header/Header"
import { EmptyToDoList } from "./components/EmptyToDoList/EmptyToDoList"
import { Task } from "./components/Task/Task"

import { PlusCircle } from 'phosphor-react'

import styles from './App.module.css'

export interface TasksType {
  text: string;
  isComplete: boolean;
}

export function App() {
  const [ tasks, setTasks ] = useState<TasksType[]>(() => {
    const tasksStorage = localStorage.getItem("@to-do:tasks-2.0.0")   

    if (tasksStorage) {
      return JSON.parse(tasksStorage)
    } else {
      return []
    }
  })

  const [ completedTasks, setCompletedTasks ] = useState(() => {
    const completedTasksStorage = localStorage.getItem("@to-do:completedTasks-2.0.0")   

    if (completedTasksStorage) {
      return JSON.parse(completedTasksStorage)
    } else {
      return 0
    }
  })

  const [ newTaskText, setNewTaskText ] = useState('')

  useEffect(() => {
    const tasksJson = JSON.stringify(tasks)

    localStorage.setItem("@to-do:tasks-2.0.0", tasksJson)
  }, [tasks])

  useEffect(() => {
    const completedTasksJson = JSON.stringify(completedTasks)  

    localStorage.setItem("@to-do:completedTasks-2.0.0", completedTasksJson)
  }, [completedTasks])

  function handleChangeNewTaskText(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewTaskText(event.target.value)
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    const newTask = {
      text: newTaskText,
      isComplete: false,
    }

    setTasks((prevState) => [...prevState, newTask])

    setNewTaskText('')
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Preencha o campo com uma tarefa!')
  }

  function onDeleteTask(taskToDelete: string, isComplete: boolean) {
    const newTasksList = tasks.filter(task => {
      if (task.text !== taskToDelete) {
        return task
      }
    })

    setTasks(newTasksList)
    
    if (isComplete) {
      setCompletedTasks((prevState: number) => prevState - 1)
    }
  }

  function onUpdateTaskList(taskText: string) {
    const taskIndex = tasks.findIndex(task => {
      return task.text === taskText
    })

    const tempTasks = [...tasks]
    tempTasks[taskIndex].isComplete = !tempTasks[taskIndex].isComplete

    setTasks(tempTasks)
  }

  function onSetCompletedTasks(setTheTaskStatusTo: 'add' | 'remove') {
    switch (setTheTaskStatusTo) {
      case 'add':
        setCompletedTasks((prevState: number) => prevState + 1)
        break
      case 'remove':
        setCompletedTasks((prevState: number) => prevState - 1)
        break
    }
  }

  return (
    <>
      <Header />

      <main className={styles.main}>
        <form 
          onSubmit={handleCreateNewTask}
          className={styles.form}
        >
          <input 
            required
            type="text"          
            placeholder="Adicione uma nova tarefa"
            value={newTaskText}
            onChange={handleChangeNewTaskText}
            onInvalid={handleNewTaskInvalid}
          />

          <button type="submit">
            Criar
            <PlusCircle size={18} />
          </button>
        </form>

        <section className={styles.tasksBox}>
          <header>
            <div>
              <p>Tarefas criadas</p>
              <span>{tasks.length}</span>
            </div>

            <div>
              <p>Concluídas</p>
              <span>{completedTasks}</span>
            </div>
          </header>  

          {
            tasks.length === 0 ? (
              <EmptyToDoList />
            ) : (
              tasks.map(currentTask => (
                <Task 
                  task={currentTask}
                  key={currentTask.text}
                  onDeleteTask={onDeleteTask}
                  onUpdateTaskList={onUpdateTaskList}
                  handleSetCompletedTasks={onSetCompletedTasks}
                />  
              ))
            )
          }
        </section>
      </main>
    </>
  )
}
