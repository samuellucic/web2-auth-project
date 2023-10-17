'use client';

import { Button } from '@mui/material';
import styles from './Header.module.css';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

const Header = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <></>;
  }
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href={'/'}>
          <Button className={styles.home}>Home</Button>
        </Link>
        {user ? (
          <a href={'/api/auth/logout'}>
            <Button className={styles.logout}>Logout</Button>
          </a>
        ) : (
          <a href={'/api/auth/login'}>
            <Button className={styles.login}>Login</Button>
          </a>
        )}
      </nav>
    </header>
  );
};

export default Header;
