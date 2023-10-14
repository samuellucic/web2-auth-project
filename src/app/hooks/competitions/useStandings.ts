import { CompetitorInfo } from '../../components/Types';
import { useEffect, useState } from 'react';
import api from '../../api/api';

const useStandings = (userId: string, competitionId: string) => {
  const [standings, setStandings] = useState<CompetitorInfo[]>();

  useEffect(() => {
    api
      .get(`/competitions/${competitionId}/standings`)
      .then((res) => res.data)
      .then((data) => {
        setStandings(data);
        console.log(data);
      });
  }, [userId, competitionId]);

  return standings;
};

export default useStandings;
