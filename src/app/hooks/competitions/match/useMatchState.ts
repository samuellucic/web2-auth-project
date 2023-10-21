import { useCallback } from 'react';
import api from '../../../api/api';
import { MatchFormInput } from '../../../components/MatchForm/MatchForm';

export interface MatchStateProps {
  firstScoreInitial?: number;
  secondScoreInitial?: number;
  username: string;
  competitionId: string;
  matchId: string;
  onUpdateCallback?: () => void;
}

const useMatchState = ({
  firstScoreInitial,
  secondScoreInitial,
  username,
  competitionId,
  matchId,
  onUpdateCallback,
}: MatchStateProps) => {
  const onUpdate = useCallback(
    ({ firstOpponentScore, secondOpponentScore }: MatchFormInput) => {
      if (
        !firstScoreInitial ||
        !secondScoreInitial ||
        firstScoreInitial !== firstOpponentScore ||
        secondScoreInitial !== secondOpponentScore
      ) {
        api
          .put(
            `/users/${username}/competitions/${competitionId}/matches/${matchId}`,
            {
              firstOpponentScore: firstOpponentScore,
              secondOpponentScore: secondOpponentScore,
              status: 'finished',
            }
          )
          .then(() => {
            onUpdateCallback?.();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [
      firstScoreInitial,
      secondScoreInitial,
      username,
      competitionId,
      matchId,
      onUpdateCallback,
    ]
  );
  const onDelete = useCallback(() => {
    api
      .delete(
        `/users/${username}/competitions/${competitionId}/matches/${matchId}`
      )
      .then(() => {
        onUpdateCallback?.();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username, competitionId, matchId, onUpdateCallback]);

  return { onUpdate, onDelete };
};

export default useMatchState;
