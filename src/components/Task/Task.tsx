import { Trash } from 'phosphor-react';
import styles from './Task.module.css';

type TaskProps = {
    task: string;
};

export function Task({ task }: TaskProps) {
    return (
        <div className={styles.taskBox}>
            <div 
                className={styles.checkbox}
            >
                <div><span>.</span></div>
            </div>

            <p>{task}</p>

            <button
            >
                <Trash size={24} />
            </button>
        </div>
    )
}
