import { deleteMatchResults, updateMatch } from '../../../../db';

export const POST = async (
  req: Request,
  {
    params: { competitionId, matchId },
  }: { params: { competitionId: string; matchId: string } }
) => {
  const userId = 'admin';

  await updateMatch(userId, competitionId, matchId, await req.json());

  return new Response(undefined, {
    status: 201,
  });
};

export const PATCH = async (
  req: Request,
  {
    params: { competitionId, matchId },
  }: { params: { competitionId: string; matchId: string } }
) => {
  const userId = 'admin';

  await deleteMatchResults(userId, competitionId, matchId);

  return new Response(undefined, {
    status: 201,
  });
};
