'use client';

import styles from './CompetitionForm.module.css';
import { FormEvent } from 'react';
import useFormInput, { FormInputError } from '../../hooks/useFormInput';
import { Button, TextField } from '@mui/material';
import { Competition } from '../Types';

interface CompetitionFormProps {
  initialCompetitionName?: string;
  initialCompetitorNames?: string;
  initialScoringSystem?: string;
}

const validateCompetitionName = (value: string): FormInputError => {
  if (value.trim().length < 1) {
    return {
      isValid: false,
      message: 'Competition name must be defined',
    };
  }

  return { isValid: true };
};

const validateCompetitorNames = (value: string): FormInputError => {
  const valueTrimmed = value.trim();
  if (valueTrimmed.length < 1) {
    return {
      isValid: false,
      message: 'Competitor names must be defined',
    };
  }

  if (valueTrimmed.includes('\n') && valueTrimmed.includes(';')) {
    return {
      isValid: false,
      message:
        'Competitor names can only be divided by one type of separator: new line or a semicolon.',
    };
  }

  const separator = valueTrimmed.includes(';') ? ';' : '\n';
  const competitorNames = valueTrimmed.split(separator);

  if (competitorNames.length < 4 || competitorNames.length > 8) {
    return {
      isValid: false,
      message:
        'Number of competitors should be between 4 and 8. Separate competitor names with a new line or a semicolon',
    };
  }

  for (const competitorName of competitorNames) {
    if (competitorName.trim().length < 1) {
      return {
        isValid: false,
        message: "Competitor's name cannot be blank text.",
      };
    }
  }

  return { isValid: true };
};

const validateScoringSystem = (value: string): FormInputError => {
  const valueTrimmed = value.trim();
  if (valueTrimmed.length < 1) {
    return {
      isValid: false,
      message: 'Scoring system must be defined',
    };
  }

  const scoringSystem = valueTrimmed.split('/');

  if (scoringSystem.length !== 3) {
    return {
      isValid: false,
      message:
        'Scoring system requires win draw and lose points to be separated with /. e.g. 3/1/0',
    };
  } else if (valueTrimmed.includes(' ')) {
    return {
      isValid: false,
      message: 'No whitespaces allowed in scoring system definition',
    };
  } else {
    for (const points of scoringSystem) {
      if (!/^\d+$/.test(points)) {
        return {
          isValid: false,
          message: 'Points must be defined as valid integers.',
        };
      }
    }
  }

  return { isValid: true };
};

const CompetitionForm = ({
  initialCompetitionName = '',
  initialCompetitorNames = '',
  initialScoringSystem = '',
}: CompetitionFormProps) => {
  const [competitionName, onCompetitionNameChange, competitionNameError] =
    useFormInput({
      initialValue: initialCompetitionName,
      validate: validateCompetitionName,
    });
  const [competitorNames, onCompetitorNamesChange, competitorNamesError] =
    useFormInput({
      initialValue: initialCompetitorNames,
      validate: validateCompetitorNames,
    });
  const [scoringSystem, onScoringSystemChange, scoringSystemError] =
    useFormInput({
      initialValue: initialScoringSystem,
      validate: validateScoringSystem,
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !validateCompetitionName(competitionName).isValid &&
      !validateCompetitorNames(competitorNames).isValid &&
      !validateScoringSystem(scoringSystem).isValid
    ) {
      return;
    }

    const separator = competitorNames.includes(';') ? ';' : '\n';
    const competitorNamesSanitized = competitorNames
      .split(separator)
      .map((name) => name.trim());
    const scoringSystemSanitized = scoringSystem.trim().split('/');

    const competition: Competition = {
      competitionName: competitionName.trim(),
      competitorNames: competitorNamesSanitized,
      scoringSystem: {
        win: parseInt(scoringSystemSanitized[0]),
        draw: parseInt(scoringSystemSanitized[1]),
        lose: parseInt(scoringSystemSanitized[2]),
      },
    };

    fetch('http://localhost:3000/api/competitions', {
      method: 'POST',
      body: JSON.stringify(competition),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('RES', data);
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextField
        className={styles.input}
        id="outlined-basic"
        label="Competition name"
        variant="outlined"
        value={competitionName}
        onChange={onCompetitionNameChange}
        helperText={competitionNameError}
        error={competitionNameError !== undefined}
        required
      />
      <TextField
        className={styles.input}
        id="outlined-basic"
        label="Scoring system"
        variant="outlined"
        value={scoringSystem}
        onChange={onScoringSystemChange}
        helperText={scoringSystemError}
        error={scoringSystemError !== undefined}
        required
      />
      <TextField
        className={styles.input}
        id="outlined-basic"
        label="Competitors"
        variant="outlined"
        multiline
        value={competitorNames}
        onChange={onCompetitorNamesChange}
        helperText={competitorNamesError}
        error={competitorNamesError !== undefined}
        required
      />
      <Button variant={'contained'} type={'submit'}>
        Submit
      </Button>
    </form>
  );
};

export default CompetitionForm;
