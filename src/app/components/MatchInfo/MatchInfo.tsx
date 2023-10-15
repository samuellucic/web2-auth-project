import styles from './MatchInfo.module.css';
import {
  Add,
  CancelOutlined,
  Delete,
  DoneOutline,
  Edit,
  RemoveCircleOutline,
} from '@mui/icons-material';
import { Match } from '../Types';
import { useCallback, useState } from 'react';
import MatchForm from '../MatchForm/MatchForm';
import api from '../../api/api';

export interface ResultProps extends Match {
  competitionId: string;
  isCreator: boolean;
  onUpdate?: () => void;
}

export type ResultType = 'first' | 'draw' | 'second';

const returnIconBasedOnResult = (
  opponent: 'first' | 'second',
  result: ResultType
) => {
  if (result === 'draw') {
    return (
      <div className={styles.draw}>
        <RemoveCircleOutline />
      </div>
    );
  } else if (result === opponent) {
    return (
      <div className={styles.victory}>
        <DoneOutline />
      </div>
    );
  } else {
    return (
      <div className={styles.lose}>
        <CancelOutlined />
      </div>
    );
  }
};

const MatchInfo = ({
  id,
  competitionId,
  firstOpponent,
  secondOpponent,
  status,
  firstOpponentScore,
  secondOpponentScore,
  isCreator,
  onUpdate,
}: ResultProps) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpen = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleDelete = useCallback(() => {
    api.patch(`/competitions/${competitionId}/matches/${id!}`).then((res) => {
      onUpdate?.();
    });
  }, [competitionId, id, onUpdate]);

  if (status === 'upcoming') {
  }
  let result: ResultType | undefined;
  if (status === 'finished') {
    if (firstOpponentScore === secondOpponentScore) {
      result = 'draw';
    } else if (firstOpponentScore! > secondOpponentScore!) {
      result = 'first';
    } else {
      result = 'second';
    }
  }

  return (
    <div className={styles.info}>
      <MatchForm
        matchId={id!}
        competitionId={competitionId}
        firstOpponent={firstOpponent}
        secondOpponent={secondOpponent}
        firstOpponentScore={firstOpponentScore}
        secondOpponentScore={secondOpponentScore}
        dialogOpen={dialogOpen}
        onUpdate={onUpdate}
        onClose={handleClose}
      />
      <div className={styles.opponents}>
        <div className={styles.opponent}>
          <p className={styles['opponent-name']}>{firstOpponent}</p>
          {result && (
            <div className={styles['result-detail']}>
              <p className={styles.points}>{firstOpponentScore}</p>
              {returnIconBasedOnResult('first', result)}
            </div>
          )}
        </div>
        <div className={styles.opponent}>
          <p className={styles['opponent-name']}>{secondOpponent}</p>
          {result && (
            <div className={styles['result-detail']}>
              <p className={styles.points}>{secondOpponentScore}</p>
              {returnIconBasedOnResult('second', result)}
            </div>
          )}
        </div>
      </div>
      <div className={styles['match-status']}>
        <p>{result ? 'Finished' : 'Upcoming'}</p>
        {isCreator && (
          <div className={styles.icons}>
            {result ? (
              <>
                <Edit className={styles['action-icon']} onClick={handleOpen} />
                <Delete
                  className={styles['action-icon']}
                  onClick={handleDelete}
                />
              </>
            ) : (
              <Add className={styles['action-icon']} onClick={handleOpen} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchInfo;
