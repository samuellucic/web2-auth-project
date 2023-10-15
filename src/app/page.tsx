'use client';

import useCompetitions from './hooks/competitions/useCompetitions';
import styles from './page.module.css';
import Link from 'next/link';
import Header from './components/Header/Header';

const Home = () => {
  const isLoggedIn = false;

  const competitions = useCompetitions('admin');

  return (
    <>
      <Header />
      <main className={styles.container}>
        <h2 className={styles.title}>Competitions</h2>
        <Link href={'/competitions/new'} className={styles['new-link']}>
          <h3>Create a new competition</h3>
        </Link>
        {competitions &&
          competitions.map((competition) => {
            return (
              <Link
                href={`/competitions/${competition.id}`}
                className={styles.competition}
                key={competition.id}>
                <h3>{competition.competitionName}</h3>
              </Link>
            );
          })}
      </main>
    </>
  );
};

export default Home;
