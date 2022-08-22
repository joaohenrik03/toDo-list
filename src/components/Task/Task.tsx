import { Trash } from 'phosphor-react';
import { useState } from 'react';
import styles from './Task.module.css';

type TaskProps = {
    task: string;
    onDeleteTask: (task: string) => void;
    onSetCompleteTasks: (number: number) => void;
    reduceTheNumberOfCompletedTasks: () => void;
};

export function Task({ task, onDeleteTask, onSetCompleteTasks, reduceTheNumberOfCompletedTasks }: TaskProps) {
    const [thisTaskIsComplete, setThisTaskIsComplete] = useState(false);

    function handleDeleteTask() {
        if (thisTaskIsComplete) {
            reduceTheNumberOfCompletedTasks();
        }

        onDeleteTask(task);
    };

    function handleMarkTaskAsCompleted() {
        if (thisTaskIsComplete) {
            return;
        } else {
            onSetCompleteTasks(1);
        }

        setThisTaskIsComplete(true);
    };

    return (
        <div className={thisTaskIsComplete ? `${styles.taskBoxCompleted}` : `${styles.taskBox}`}>
            <div 
                className={styles.checkbox}
                onClick={handleMarkTaskAsCompleted}
            >
                <div><span>.</span></div>
            </div>

            <p>{task}</p>

            <button
                onClick={handleDeleteTask}
            >
                <Trash size={24} />
            </button>
        </div>
    )
}
