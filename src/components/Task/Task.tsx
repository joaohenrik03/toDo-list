import { Trash } from 'phosphor-react';
import styles from './Task.module.css';

type TaskProps = {
    task: string;
    onDeleteTask: (task: string) => void;
};

export function Task({ task, onDeleteTask }: TaskProps) {
    function handleDeleteTask() {
        onDeleteTask(task);
    }

    return (
        <div className={styles.taskBox}>
            <div 
                className={styles.checkbox}
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
