import { useState } from 'react'
import { Trash } from 'phosphor-react'

import styles from './Task.module.css'

import { TasksType } from '../../App'

interface TaskProps {
  task: TasksType;
  onDeleteTask: (taskToDelete: string, isComplete: boolean) => void;
  onUpdateTaskList: (taskText: string) => void;
  handleSetCompletedTasks: (setTheTaskStatusTo: 'add' | 'remove') => void;
}

export function Task({ task, onDeleteTask, handleSetCompletedTasks, onUpdateTaskList }: TaskProps) {
  const [ taskStatus, setTaskStatus ] = useState(task.isComplete)

  function handleStatusTaskChange() {
    if (!taskStatus) {
        setTaskStatus(true)
        handleSetCompletedTasks('add')
    } else if (taskStatus) {
        setTaskStatus(false)
        handleSetCompletedTasks('remove')
    }

    handleUpdateTaskList()
  }

  function handleUpdateTaskList() {
    onUpdateTaskList(task.text)
  }

  function handleDeleteTask() {
    onDeleteTask(task.text, taskStatus)
  }

  return (
    <div className={taskStatus ? styles.taskComplete : styles.task }>
      <div 
        className={styles.checkbox}
        onClick={handleStatusTaskChange}
      >
        <div><span>.</span></div>
      </div>

      <p>
        {task.text}
      </p>  

      <button
        className={styles.deleteTaskButton}
        onClick={handleDeleteTask}
        title="Deletar tarefa"
      >
        <Trash size={18} />
      </button>
    </div>  
  )
}