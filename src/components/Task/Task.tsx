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
  const [ taskIsComplete, setTaskIsComplete ] = useState(task.isComplete)

  function handleStatusTaskChange() {
    if (!taskIsComplete) {
        setTaskIsComplete(true)
        handleSetCompletedTasks('add')
    } else if (taskIsComplete) {
        setTaskIsComplete(false)
        handleSetCompletedTasks('remove')
    }

    handleUpdateTaskList()
  }

  function handleUpdateTaskList() {
    onUpdateTaskList(task.content)
  }

  function handleDeleteTask() {
    onDeleteTask(task.content, taskIsComplete)
  }

  return (
    <div className={taskIsComplete ? styles.taskComplete : styles.task }>
      <div 
        className={styles.checkbox}
        onClick={handleStatusTaskChange}
      >
        <div><span>.</span></div>
      </div>

      <p>
        {task.content}
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