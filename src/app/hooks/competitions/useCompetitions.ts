import { useEffect, useState } from 'react';
import api from '../../api/api';
import { Competition } from '../../components/Types';

const useCompetitions = (userId: string) => {
  const [competitions, setCompetitions] = useState<Competition[]>();

  useEffect(() => {
    api
      .get('/competitions')
      .then((res) => res.data)
      .then((data) => {
        setCompetitions(data);
        console.log(data);
      });
  }, [userId]);

  return competitions;
};

export default useCompetitions;
