import ClipboardImg from '../../assets/clipboard.svg'

import styles from './EmptyToDoList.module.css'

export function EmptyToDoList() {
  return (
    <div className={styles.emptyToDoList}>
      <img 
        src={ClipboardImg} 
        alt="Ícone de uma lista" 
      />  

      <p>
        <span>
          Você ainda não tem tarefas cadastradas  
        </span>
        Crie tarefas e organize seus itens a fazer
      </p>
    </div>  
  )
}