import { Match } from '../../components/Types';
import { useEffect, useState } from 'react';
import api from '../../api/api';

const useSchedule = (userId: string, competitionId: string) => {
  const [schedule, setSchedule] = useState<Match[]>();

  useEffect(() => {
    api
      .get(`/competitions/${competitionId}/schedule`)
      .then((res) => res.data)
      .then((data) => {
        setSchedule(data);
        console.log(data);
      });
  }, [userId, competitionId]);

  return schedule;
};

export default useSchedule;
