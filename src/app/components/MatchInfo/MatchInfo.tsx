import styles from './MatchInfo.module.css';
import {
  CancelOutlined,
  DoneOutline,
  RemoveCircleOutline,
} from '@mui/icons-material';
import { Match } from '../Types';

export type ResultProps = Match;
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
  firstOpponent,
  secondOpponent,
  status,
  firstOpponentScore,
  secondOpponentScore,
}: ResultProps) => {
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
        {/* if admin then */}
      </div>
    </div>
  );
};

export default MatchInfo;
