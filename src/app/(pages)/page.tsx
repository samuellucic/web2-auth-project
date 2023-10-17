'use client';

import styles from './page.module.css';
import Link from 'next/link';
import useCompetitions from '../hooks/competitions/useCompetitions';
import { UserProfile, useUser } from '@auth0/nextjs-auth0/client';

const Home = () => {
  const { user, isLoading } = useUser();
  return (
    <>
      <main className={styles.container}>
        {!isLoading &&
          (user ? (
            <>
              <h2 className={styles.title}>Competitions</h2>
              <Link href={'/competitions/new'} className={styles['new-link']}>
                <h3>Create a new competition</h3>
              </Link>
              <Competitions user={user} />{' '}
            </>
          ) : (
            <h3>Login to create and see your current competitions</h3>
          ))}
      </main>
    </>
  );
};

export default Home;

const Competitions = ({ user }: { user: UserProfile }) => {
  const competitions = useCompetitions('admin');

  return (
    <>
      {competitions &&
        competitions.map((competition) => {
          return (
            <Link
              href={`/users/${user.nickname}/competitions/${competition.id}`}
              className={styles.competition}
              key={competition.id}>
              <h3>{competition.competitionName}</h3>
            </Link>
          );
        })}
    </>
  );
};
