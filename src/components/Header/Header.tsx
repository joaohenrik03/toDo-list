import LogoToDo from '../../assets/logo-todo.svg'

import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <img
        className={styles.logo}
        src={LogoToDo}
        alt="Palavra todo com um foguete ao lado"
      />
    </header>
  )
}
