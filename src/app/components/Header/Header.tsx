import { Button } from '@mui/material';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Button className={styles.home}>Home</Button>
        <Button className={styles.logout} onClick={() => {}}>
          Logout
        </Button>
      </nav>
    </header>
  );
};

export default Header;
