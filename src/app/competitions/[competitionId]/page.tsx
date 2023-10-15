'use client';

import { useParams } from 'next/navigation';
import Standings from '../../components/Standings/Standings';
import React, { useCallback, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import styles from './page.module.css';
import { ArrowBack } from '@mui/icons-material';
import Link from 'next/link';
import useStandings from '../../hooks/competitions/useStandings';
import useSchedule from '../../hooks/competitions/useSchedule';
import Schedule from '../../components/Schedule/Schedule';

const Competition = () => {
  const [tab, setTab] = useState<number>(0);
  const { competitionId }: { competitionId: string } = useParams();

  const [standings, forceStandingsUpdate] = useStandings(
    'admin',
    competitionId
  );
  const [schedule, forceScheduleUpdate] = useSchedule('admin', competitionId);

  const handleChange = (event: React.SyntheticEvent, tab: number) => {
    setTab(tab);
  };

  const handleScheduleUpdate = useCallback(() => {
    forceScheduleUpdate();
    forceStandingsUpdate();
  }, [forceScheduleUpdate, forceStandingsUpdate]);

  return (
    <>
      <header className={styles.header}>
        <Link href={'/'}>
          <div className={styles.icon}>
            <ArrowBack />
          </div>
        </Link>
        <Tabs className={styles.tabs} value={tab} onChange={handleChange}>
          <Tab label={'Standings'} />
          <Tab label={'Schedule'} />
        </Tabs>
      </header>
      <main className={styles.competition}>
        {tab === 0 && standings && <Standings standings={standings} />}
        {tab === 1 && schedule && (
          <Schedule
            competitionId={competitionId}
            schedule={schedule}
            onUpdate={handleScheduleUpdate}
          />
        )}
      </main>
    </>
  );
};

export default Competition;
