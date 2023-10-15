import MatchInfo from '../MatchInfo/MatchInfo';
import styles from './Schedule.module.css';
import { Match } from '../Types';

export interface ScheduleProps {
  competitionId: string;
  schedule: Match[];
  onUpdate?: () => void;
}

const Schedule = ({ competitionId, schedule, onUpdate }: ScheduleProps) => {
  const isCreator = true;

  return (
    <div className={styles.container}>
      {schedule &&
        schedule.map((match) => {
          return (
            <MatchInfo
              competitionId={competitionId}
              key={match.id}
              {...match}
              isCreator={isCreator}
              onUpdate={onUpdate}
            />
          );
        })}
    </div>
  );
};

export default Schedule;
