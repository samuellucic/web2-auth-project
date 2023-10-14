import { Match } from '../../../../components/Types';
import { getFinishedMatches, getUpcomingMatches } from '../../../db';

export const GET = async (
  req: Request,
  { params: { competitionId } }: { params: { competitionId: string } }
) => {
  const userId = 'admin'; //req.headers.get('id');

  const upcomingMatches: Match[] = (await getUpcomingMatches(
    userId,
    competitionId
  )) as unknown as Match[];
  const finishedMatches: Match[] = (await getFinishedMatches(
    userId,
    competitionId
  )) as unknown as Match[];

  return new Response(
    JSON.stringify([...finishedMatches, ...upcomingMatches]),
    {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }
  );
};
