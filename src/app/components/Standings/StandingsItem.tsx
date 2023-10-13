export interface StandingsItemProps {
  position: number;
  name: string;
  played: number;
  points: number;
}

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
