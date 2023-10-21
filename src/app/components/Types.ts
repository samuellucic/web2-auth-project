export interface ScoringSystem {
  win: number;
  draw: number;
  lose: number;
}

export interface Competition {
  id?: string;
  competitionName: string;
  competitorNames: string[];
  scoringSystem: ScoringSystem;
}

export type MatchType = 'upcoming' | 'finished';

export interface Match {
  id?: string;
  firstOpponent: string;
  secondOpponent: string;
  status: MatchType;
  firstOpponentScore?: number;
  secondOpponentScore?: number;
  round: number;
}

export interface CompetitorInfo {
  position: number;
  name: string;
  played: number;
  points: number;
}
