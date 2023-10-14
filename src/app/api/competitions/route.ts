import { bergman } from '../../components/bergman';
import { addCompetition, getCompetitionsByUserId } from '../db';

export const GET = async (req: Request) => {
  const userId = 'admin';
  const competitions = await getCompetitionsByUserId(userId);

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

  await addCompetition('admin', competition, schedule);

  return new Response(JSON.stringify(schedule), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
