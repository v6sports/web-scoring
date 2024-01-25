export interface Iscoreboard {
  status?: number;
  message?: string;
  toss_description?: string;
  match_type?: number;
  inning_number?: number;
  match_status?: string;
  innings?: Innings;
  match_details?: MatchDetails;
  match_id?: number;
  match_finished?: boolean;
  is_match?: boolean;
  api?: boolean;
}

export interface Innings {
  "1"?: The1;
  "2"?: The1;
  "3"?: The1;
  "4"?: The1;
}

export interface The1 {
  scores?: Scores;
  runs?: number;
  overs?: number;
  over_number?: number; // extra added not part of orignal
  curr_over_ball?: number; // extra added not part of orignal
  run_rate?: number;
  wickets?: number;
  inning_id?: number;
  inning_number?: number;
  team_id?: number;
  name?: string;
  short_name?: string;
  logo_image?: string;
  slug?: string;
  yet_to_bat?: YetToBat[];
  fallofwickets?: any[];
  batting?: Batting[];
  bowling?: Bowling[];
}

export interface Batting {
  user_id?: number;
  username?: string;
  player_id?: number;
  name?: string;
  is_captain?: number;
  is_vicecaptain?: number;
  is_keeper?: number;
  on_strike?: number;
  is_user_active?: number;
  stats?: BattingStats;
  is_out?: string;
  is_retired?: boolean;
  retired_string?: string;
  outstring?: string;
}

export interface BattingStats {
  runs?: number;
  fours?: number;
  sixs?: number;
  balls?: number;
  "strike-rate"?: number;
  strike_rate?: number;
}

export interface Bowling {
  user_id?: number;
  username?: string;
  player_id?: number;
  name?: string;
  is_user_active?: number;
  on_attack?: number;
  stats?: BowlingStats;
}

export interface BowlingStats {
  totalBalls?: number;
  totalOver?: string;
  lastOverBalls?: number;
  totalRuns?: number;
  totalWictkets?: number;
  totalZeros?: number;
  totalFours?: number;
  totalSixs?: number;
  er_rate?: number;
  maidens?: number;
  wide_balls?: number;
  no_balls?: number;
  sr_rate?: string;
}

export interface Scores {
  bye?: number;
  legbye?: number;
  wideRuns?: number;
  noBallsRuns?: number;
  totalRuns?: number;
  wickets?: number;
  overs?: number;
  po?: number;
  totalBalls?: number;
  penalty?: number;
}

export interface YetToBat {
  player_id?: number;
  name?: string;
  username?: string;
  is_captain?: number;
  is_vicecaptain?: number;
}

export interface MatchDetails {
  tournament_name?: string;
  format?: string;
  venue?: string;
  toss_won_by_name?: string;
  choose_to?: string;
  man_of_the_match?: string;
  match_won_by?: string;
  team_a_details?: string;
  team_b_details?: string;
  visitors_count?: string;
  team_a_new_det?: TeamNewDet;
  team_b_new_det?: TeamNewDet;
  banners?: any[];
  umpires?: string;
  umpires_list?: any[];
  scorers?: string;
  scorers_list?: ScorersList[];
}

export interface ScorersList {
  user_id?: number;
  match_id?: number;
  name?: string;
  active_scorer?: number;
  role?: string;
  username?: string;
}

export interface TeamNewDet {
  name?: string;
  short_name?: string;
  slug?: string;
  team_id?: number;
  players?: Player[];
  extra_players?: any[];
}

export interface Player {
  name?: string;
  username?: string;
  player_id?: number;
  is_captain?: number;
  is_vicecaptain?: number;
  is_wtkeeper_active?: number;
  user_id?: number;
  avatar?: string;
}
