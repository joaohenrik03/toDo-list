import { Header } from "./components/Header/Header";

import Clipboard from './assets/clipboard.png';
import PlusIcon from './assets/plus.svg';
import styles from './App.module.css';

export function App() {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <form className={styles.form}>
          <input 
            type="text" 
            placeholder='Adicione uma nova tarefa'
            required
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
                <span>0</span>
              </strong>
            </div>

            <div className={styles.completeTasks}>
              <strong>
                Concluídas 
                <span>0 de 0</span>
              </strong>
            </div>
          </header>   
          
          <div className={styles.taskListContainer}>
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
          </div>
        </section>
      </main>
    </>
  )
}
