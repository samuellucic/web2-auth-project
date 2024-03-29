import { getCompetitionById, getMatches } from '../../../../../db';
import {
  Competition,
  CompetitorInfo,
  Match,
  ScoringSystem,
} from '../../../../../../components/Types';

export const GET = async (
  req: Request,
  {
    params: { username, competitionId },
  }: { params: { username: string; competitionId: string } }
) => {
  const competition: Competition = (await getCompetitionById(
    username,
    competitionId
  )) as Competition;
  const finishedMatches: Match[] = (await getMatches(
    username,
    competitionId,
    'finished'
  )) as unknown as Match[];

  if (!competition.competitionName) {
    return new Response(undefined, {
      status: 404,
      statusText: `Could not find the competition for id=${competitionId}`,
    });
  }

  const standings: { [key: string]: Partial<CompetitorInfo> } = {};
  for (const competitorName of competition.competitorNames) {
    standings[competitorName] = {
      name: competitorName,
      points: 0,
      played: 0,
    };
  }

  for (const match of finishedMatches) {
    const [firstOpponentPoints, secondOpponentPoints] = calculatePoints(
      competition.scoringSystem,
      match.firstOpponentScore!,
      match.secondOpponentScore!
    );
    standings[match.firstOpponent].points! += firstOpponentPoints;
    standings[match.firstOpponent].played! += 1;
    standings[match.secondOpponent].points! += secondOpponentPoints;
    standings[match.secondOpponent].played! += 1;
  }

  const standingsList = Object.values(standings)
    .sort(
      (competitor1, competitor2) => competitor2.points! - competitor1.points!
    )
    .map((competitor, index) => ({
      position: index + 1,
      ...competitor,
    }));

  return new Response(JSON.stringify(standingsList), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
};

const calculatePoints = (
  scoringSystem: ScoringSystem,
  firstOpponentScore: number,
  secondOpponentScore: number
) => {
  if (firstOpponentScore > secondOpponentScore) {
    return [scoringSystem.win, scoringSystem.lose];
  } else if (firstOpponentScore === secondOpponentScore) {
    return [scoringSystem.draw, scoringSystem.draw];
  }
  return [scoringSystem.lose, scoringSystem.win];
};
