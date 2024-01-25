export interface IballByBall {
  localId?: number;
  over?: number;
  runs?: number;
  extras?: number;
  is_out?: number;
  out_by?: number;
  user_id?: string;
  who_out?: number;
  boundary?: number;
  match_id?: string;
  assist_by?: number;
  on_attack?: number;
  on_strike?: number;
  team_runs?: number;
  extra_type?: "wide" | "no-ball" | "bye" | "leg-bye";
  non_attack?: number;
  non_strike?: number;
  ball_number?: 0 | 1 | 2 | 3 | 4 | 5 | 6 ;
	nextBallNumber?:number;
  ball_number_included_extra?: number; // added Extra
  over_number?: number;
  wicket_type?: number;
  next_batsman?: number;
  scoring_area?: number;
  inning_number?: number;
  bowling_length?: number;
  non_striker_out?: number;
  videoURL?: string;
  isUndo?: boolean;
  currentTimeStamp?: string;
  overMeta?: OverMeta;
}

export interface OverMeta {
  overNumber?: number;
  ballNumber?: number;
  isOverEnd?: boolean;
}
