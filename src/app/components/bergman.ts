export const bergman = (competitors: string[]) => {
  const schedule: [string, string][][] = [];

  const even = competitors.length % 2 == 0;
  const rounds = even ? competitors.length - 1 : competitors.length;
  const maxRounds = rounds + 1;

  let index = 0;
  for (let i = 0; i < rounds; i++) {
    const round: [string, string][] = [];

    if (even) {
      if (i % 2 == 0) {
        round.push([competitors[index], competitors[rounds]]);
      } else {
        round.push([competitors[rounds], competitors[index]]);
      }
    }
    for (let j = 1; j < maxRounds / 2; j++) {
      const first = competitors[(index + j) % rounds];
      const second = competitors[correctIndex(index - j, rounds)];
      round.push([first, second]);
    }

    schedule.push(round);
    index = correctIndex(index - (maxRounds / 2 - 1), rounds);
  }

  return schedule;
};

const correctIndex = (index: number, modulus: number): number => {
  if (index < 0) {
    return index + modulus;
  } else {
    return index % modulus;
  }
};
