import Standings from './components/Standings/Standings';
import { StandingsItemProps } from './components/Standings/StandingsItem';

export default function Home() {
  const standings: StandingsItemProps[] = [
    {
      name: 'name',
      played: 2,
      points: 6,
      position: 1,
    },
  ];

  return (
    <div
      style={{
        width: 350,
        height: 450,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/*<CompetitionForm />*/}
      <Standings standings={standings} />
      {/*<CompetitionForm />*/}
      {/*<MatchInfo*/}
      {/*  firstOpponent={'First'}*/}
      {/*  secondOpponent={'second'}*/}
      {/*  status={'finished'}*/}
      {/*  firstOpponentScore={4}*/}
      {/*  secondOpponentScore={5}*/}
      {/*/>*/}
      {/*<MatchInfo*/}
      {/*  firstOpponent={'First'}*/}
      {/*  secondOpponent={'Second'}*/}
      {/*  status={'upcoming'}*/}
      {/*/>*/}
    </div>
  );
}
