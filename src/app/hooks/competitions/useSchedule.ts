import { Match } from '../../components/Types';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import useForceUpdate from '../useForceUpdate';

const useSchedule = (
  userId: string,
  competitionId: string
): [Match[] | undefined, () => void] => {
  const [schedule, setSchedule] = useState<Match[]>();
  const [toggle, forceUpdate] = useForceUpdate();

  useEffect(() => {
    api
      .get(`/competitions/${competitionId}/schedule`)
      .then((res) => res.data)
      .then((data) => {
        setSchedule(data);
        console.log(data);
      });
  }, [userId, competitionId, toggle]);

  return [schedule, forceUpdate];
};

export default useSchedule;
