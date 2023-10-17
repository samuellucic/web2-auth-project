'use client';

import CompetitionForm from '../../../components/CompetitionForm/CompetitionForm';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

const NewCompetition = withPageAuthRequired(() => {
  const router = useRouter();

  const handleSubmit = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <>
      <main className={styles.container}>
        <section className={styles['form-container']}>
          <CompetitionForm onSubmit={handleSubmit} />
        </section>
      </main>
    </>
  );
});

export default NewCompetition;
