import useSchedule from '../../hooks/competitions/useSchedule';
import MatchInfo from '../MatchInfo/MatchInfo';

export interface ScheduleProps {
  competitionId: string;
}

const Schedule = ({ competitionId }: ScheduleProps) => {
  const schedule = useSchedule('admin', competitionId);
  const isCreator = true;

  return (
    <div>
      {schedule &&
        schedule.map((match) => {
          return <MatchInfo key={match.id} {...match} isCreator={isCreator} />;
        })}
    </div>
  );
};

export default Schedule;
