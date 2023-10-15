import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { CompetitorInfo } from '../Types';

export interface StandingsProps {
  standings: CompetitorInfo[];
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
          {standings &&
            standings.map((competitor) => (
              <TableRow key={competitor.name}>
                <TableCell component="th" scope="row">
                  {competitor.position}
                </TableCell>
                <TableCell align="right">{competitor.name}</TableCell>
                <TableCell align="right">{competitor.played}</TableCell>
                <TableCell align="right">{competitor.points}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Standings;
