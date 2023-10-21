import { Match } from '../../../../../../components/Types';
import { getMatches } from '../../../../../db';

export const GET = async (
  req: Request,
  {
    params: { username, competitionId },
  }: { params: { username: string; competitionId: string } }
) => {
  const matches: Match[] = (await getMatches(
    username,
    competitionId
  )) as unknown as Match[];

  if (matches.length < 1) {
    return new Response(undefined, {
      status: 404,
      statusText: `Could not find the schedule for id=${competitionId}`,
    });
  }

  const matchesByRound: Match[][] = [];
  for (const match of matches) {
    const roundIndex = match.round - 1;
    if (!matchesByRound[roundIndex]) {
      matchesByRound[roundIndex] = [];
    }
    matchesByRound[roundIndex].push(match);
  }
  return new Response(JSON.stringify(matchesByRound), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
};
