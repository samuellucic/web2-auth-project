import { deleteMatchResults, updateMatch } from '../../../../../../db';
import { checkAuth } from '../../../../../../../helpers/auth-helper';

interface MatchParams {
  params: {
    username: string;
    competitionId: string;
    matchId: string;
  };
}

export const PUT = async (
  req: Request,
  { params: { username, competitionId, matchId } }: MatchParams
) => {
  const authRes = await checkAuth(username);
  if (authRes) {
    return authRes;
  }

  const updateSuccessful = await updateMatch(
    username,
    competitionId,
    matchId,
    await req.json()
  );

  if (!updateSuccessful) {
    return new Response(null, {
      status: 404,
      statusText: 'Match does not exist.',
    });
  }
  return new Response(undefined, {
    status: 204,
  });
};

export const DELETE = async (
  req: Request,
  { params: { username, competitionId, matchId } }: MatchParams
) => {
  const authRes = await checkAuth(username);
  if (authRes) {
    return authRes;
  }
  await deleteMatchResults(username, competitionId, matchId);

  return new Response(undefined, {
    status: 204,
  });
};
