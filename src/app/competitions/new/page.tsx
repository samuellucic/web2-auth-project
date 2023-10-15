'use client';

import CompetitionForm from '../../components/CompetitionForm/CompetitionForm';
import styles from './page.module.css';
import Header from '../../components/Header/Header';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const NewCompetition = () => {
  const router = useRouter();

  const handleSubmit = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <>
      <Header />
      <main className={styles.container}>
        <section className={styles['form-container']}>
          <CompetitionForm onSubmit={handleSubmit} />
        </section>
      </main>
    </>
  );
};

export default NewCompetition;
