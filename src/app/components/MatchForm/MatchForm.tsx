import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import useFormInput, { FormInputError } from '../../hooks/useFormInput';
import api from '../../api/api';

export interface MatchFormProps {
  matchId: string;
  competitionId: string;
  firstOpponent: string;
  secondOpponent: string;
  firstOpponentScore?: number;
  secondOpponentScore?: number;
  dialogOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
}

const validate = (value: string): FormInputError => {
  if (!/^-?\d+$/.test(value)) {
    return {
      isValid: false,
      message: 'Score must be defined as valid integer.',
    };
  }
  if (parseInt(value) < 0) {
    return {
      isValid: false,
      message: 'Score cannot be negative.',
    };
  }
  return {
    isValid: true,
  };
};

const MatchForm = ({
  matchId,
  competitionId,
  firstOpponent,
  secondOpponent,
  firstOpponentScore,
  secondOpponentScore,
  dialogOpen,
  onClose,
  onUpdate,
}: MatchFormProps) => {
  const firstScoreInitial =
    firstOpponentScore !== undefined ? `${firstOpponentScore}` : '';
  const secondScoreInitial =
    secondOpponentScore !== undefined ? `${secondOpponentScore}` : '';

  const [firstScore, onFirstScoreChange, firstScoreError] = useFormInput({
    initialValue: firstScoreInitial,
    validate: validate,
  });
  const [secondScore, onSecondScoreChange, secondScoreError] = useFormInput({
    initialValue: secondScoreInitial,
    validate: validate,
  });

  const handleSubmit = () => {
    if (!validate(firstScore).isValid && !validate(secondScore).isValid) {
      return;
    }

    if (
      firstScoreInitial !== firstScore ||
      secondScoreInitial !== secondScore
    ) {
      api
        .post(`/competitions/${competitionId}/matches/${matchId}`, {
          firstOpponentScore: firstScore,
          secondOpponentScore: secondScore,
          status: 'finished',
        })
        .then((res) => {
          onUpdate?.();
          console.log('do sth');
        });
    }

    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={dialogOpen} onClose={onClose}>
      <DialogTitle>Results</DialogTitle>
      <DialogContent>
        <TextField
          margin={'dense'}
          label={firstOpponent}
          value={firstScore}
          onChange={onFirstScoreChange}
          helperText={firstScoreError}
          error={firstScoreError !== undefined}
        />
        <TextField
          margin={'dense'}
          label={secondOpponent}
          value={secondScore}
          onChange={onSecondScoreChange}
          helperText={secondScoreError}
          error={secondScoreError !== undefined}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MatchForm;
