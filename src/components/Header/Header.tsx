import Logo from '../../assets/logo.svg';
import styles from './Header.module.css';

export function Header() {
    return (
        <header className={styles.header}>
            <img 
                src={Logo} 
                alt="Logo ToDo" 
            />
        </header>
    )    
}
