import { CompetitorInfo } from '../Types';

export interface StandingsItemProps extends CompetitorInfo {}

const StandingsItem = ({
  position,
  name,
  played,
  points,
}: StandingsItemProps) => {
  return (
    <tr>
      <td>{position}</td>
      <td>{name}</td>
      <td>{played}</td>
      <td>{points}</td>
    </tr>
  );
};

export default StandingsItem;
