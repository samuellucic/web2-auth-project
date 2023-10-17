import { Match } from '../../../../../../components/Types';
import { getFinishedMatches, getUpcomingMatches } from '../../../../../db';

export const GET = async (
  req: Request,
  {
    params: { username, competitionId },
  }: { params: { username: string; competitionId: string } }
) => {
  const upcomingMatches: Match[] = (await getUpcomingMatches(
    username,
    competitionId
  )) as unknown as Match[];
  const finishedMatches: Match[] = (await getFinishedMatches(
    username,
    competitionId
  )) as unknown as Match[];

  if (upcomingMatches.length < 1 && finishedMatches.length < 1) {
    return new Response(undefined, {
      status: 404,
      statusText: `Could not find the schedule for id=${competitionId}`,
    });
  }
  return new Response(
    JSON.stringify([...finishedMatches, ...upcomingMatches]),
    {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }
  );
};
