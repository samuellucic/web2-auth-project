import { bergman } from '../../components/bergman';
import { addCompetition, getCompetitionsByUserId } from '../db';
import { getSession } from '@auth0/nextjs-auth0';

export const GET = async (req: Request) => {
  const session = await getSession();
  if (!session) {
    return new Response(null, {
      status: 401,
      statusText: 'You need to login to access competitions',
    });
  }

  const username = session.user.nickname;
  const competitions = await getCompetitionsByUserId(username);

  return new Response(JSON.stringify(competitions), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const POST = async (req: Request) => {
  const competition = await req.json();
  const schedule = bergman(competition.competitorNames);
  const session = await getSession();
  if (!session) {
    return new Response(null, {
      status: 401,
      statusText: 'You need to be logged in to execute this action.s',
    });
  }

  await addCompetition(session?.user.nickname, competition, schedule);

  return new Response(JSON.stringify(schedule), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
