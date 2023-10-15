import {CompetitorInfo} from '../../components/Types';
import {useEffect, useState} from 'react';
import api from '../../api/api';
import useForceUpdate from '../useForceUpdate';

const useStandings = (
  userId: string,
  competitionId: string
): [CompetitorInfo[] | undefined, () => void] => {
  const [standings, setStandings] = useState<CompetitorInfo[]>();
  const [toggle, forceUpdate] = useForceUpdate();

  useEffect(() => {
    api
      .get(`/competitions/${competitionId}/standings`)
      .then((res) => res.data)
      .then((data) => {
        setStandings(data);
        console.log(data);
      });
  }, [userId, competitionId, toggle]);

  return [standings, forceUpdate];
};

export default useStandings;
