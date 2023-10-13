export interface Competition {
  competitionName: string;
  competitorNames: string[];
  scoringSystem: {
    win: number;
    draw: number;
    lose: number;
  };
}
