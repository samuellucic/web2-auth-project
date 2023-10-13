import { StandingsItemProps } from './StandingsItem';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export interface StandingsProps {
  standings: StandingsItemProps[];
}

const Standings = ({ standings }: StandingsProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell align="right">Competitor</TableCell>
            <TableCell align="right">Games played</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {standings.map((standing) => (
            <TableRow key={standing.name}>
              <TableCell component="th" scope="row">
                {standing.position}
              </TableCell>
              <TableCell align="right">{standing.name}</TableCell>
              <TableCell align="right">{standing.played}</TableCell>
              <TableCell align="right">{standing.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Standings;
