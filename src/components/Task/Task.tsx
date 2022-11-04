import { useState } from 'react'
import { Trash } from 'phosphor-react'

import styles from './Task.module.css'

import { TasksType } from '../../App'

interface TaskProps {
  task: TasksType;
  onDeleteTask: (taskToDelete: string, taskStatusToDelete: string) => void;
  handleSetCompletedTasks: (setTheTaskStatusTo: 'add' | 'remove') => void;
}

export function Task({ task, onDeleteTask, handleSetCompletedTasks }: TaskProps) {
  const [ taskStatus, setTaskStatus ] = useState(task.status)

  function handleStatusTaskChange() {
    switch (taskStatus) {
      case 'progress':
        setTaskStatus('complete')
        handleSetCompletedTasks('add')
        break
      case 'complete':
        setTaskStatus('progress')
        handleSetCompletedTasks('remove')
        break
    } 
  }

  function handleDeleteTask() {
    onDeleteTask(task.text, taskStatus)
  }

  return (
    <div className={taskStatus === 'complete' ? styles.taskComplete : styles.task }>
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