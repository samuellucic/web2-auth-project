import MatchInfo from '../MatchInfo/MatchInfo';
import styles from './Schedule.module.css';
import { Match } from '../Types';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useParams } from 'next/navigation';

export interface ScheduleProps {
  competitionId: string;
  schedule: Match[][];
  onUpdate?: () => void;
}

const Schedule = ({ competitionId, schedule, onUpdate }: ScheduleProps) => {
  const { username }: { username: string } = useParams();
  const { user } = useUser();
  const isCreator = user !== undefined && user.nickname === username;

  return (
    <div className={styles.container}>
      {schedule &&
        schedule.map((round: Match[], index) => {
          return (
            <div key={index} className={styles.round}>
              <h4>Round {index + 1}</h4>
              <div className={styles.matches}>
                {round.map((match: Match) => (
                  <MatchInfo
                    username={username}
                    competitionId={competitionId}
                    key={match.id}
                    {...match}
                    isCreator={isCreator}
                    onUpdateCallback={onUpdate}
                  />
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Schedule;
