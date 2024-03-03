import { IballByBall } from "../interfaces/ballByBall.interface";
import { Iscoreboard, Player } from "../interfaces/matchScoreboard.interface";

interface IwhichTeamPlayers {
  key: "batting" | "bowling";
  matchData: Iscoreboard;
  currentInnings: Number;
}

const getPlayers = (props: IwhichTeamPlayers, teamName: any = null) => {
  const { key, matchData, currentInnings } = props;
  //@ts-ignore
  const currentInningsData = matchData.innings?.[currentInnings];
  const battingTeamId = currentInningsData?.team_id;

  const allPlayerListTeamA = matchData.match_details?.team_a_new_det;
  const allPlayerListTeamB = matchData.match_details?.team_b_new_det;
  let selectedPlayers: Player[] = [];
  // allPlayerListTeamB.players;

  if (currentInnings == 1 || currentInnings == 3) {
    if (key == "batting") {
      if (teamName) return allPlayerListTeamA?.name;
      return allPlayerListTeamA?.players;
    }
    if (key == "bowling") {
      if (teamName) return allPlayerListTeamB?.name;
      return allPlayerListTeamB?.players;
    }
  }
  if (currentInnings == 2 || currentInnings == 4) {
    if (key == "batting") {
      if (teamName) return allPlayerListTeamB?.name;
      return allPlayerListTeamB?.players;
    }
    if (key === "bowling") {
      if (teamName) return allPlayerListTeamA?.name;
      return allPlayerListTeamA?.players;
    }
  }
};

/**
 *
 * @param allPlayersList | List of All Players
 * @param playersWhoAreBatting | List Of Batter who are on Strike or NonStrike
 * @returns | List of Players
 */
const removeCurrentSelectedPlayers = (
  allPlayersList: Player[],
  playersWhoAreBattingOrBolwing: Player[]
) => {
  const userIdsToRemove = playersWhoAreBattingOrBolwing.map(
    (item) => item?.user_id
  );
  const currentPlayers: Player[] = allPlayersList.filter(
    (player) => !userIdsToRemove.includes(player?.user_id)
  );
  return currentPlayers;
};

export const strikeConfirm = (ballByBall: IballByBall) => {
  if (!ballByBall?.on_strike && !ballByBall?.non_strike) {
    return {
      onStrikeBatsman: -1,
      nonStrikeBatsman: -1,
    };
  }

  let {
    on_strike: onStrikeBatsman = -1,
    non_strike: nonStrikeBatsman = -1,
    runs = 0,
    is_out,
    ball_number,
    extras = 0,
    extra_type,
  } = ballByBall;

  if (onStrikeBatsman == -1) {
    return {
      onStrikeBatsman: -1,
      nonStrikeBatsman,
    };
  }
  if (ballByBall?.non_strike == -1) {
    return {
      onStrikeBatsman,
      nonStrikeBatsman: -1,
    };
  }
  // Assuming proper initialization of variables before this code
  switch (true) {
    case extras > 0 &&
      extras % 2 !== 0 &&
      ball_number != 6 &&
      (ballByBall.extra_type === "leg-bye" || ballByBall.extra_type === "bye"):
      [onStrikeBatsman, nonStrikeBatsman] = [nonStrikeBatsman, onStrikeBatsman];
      break;
    case extras > 0 &&
      extras % 2 != 0 &&
      ball_number == 6 &&
      (ballByBall.extra_type === "leg-bye" || ballByBall.extra_type === "bye"):
      [onStrikeBatsman, nonStrikeBatsman] = [onStrikeBatsman, nonStrikeBatsman];
      break;
			//@ts-ignore
    case is_out == 1 && (ball_number == 0 || ball_number == 6):
      onStrikeBatsman = nonStrikeBatsman;
      nonStrikeBatsman = -1;
      break;
//@ts-ignore
    case is_out == 1 && ball_number !== 0 && ball_number !== 6:
      onStrikeBatsman = -1;
      break;

    case runs % 2 !== 0 && (ball_number === 0 || ball_number === 6):
      break;
//@ts-ignore
    case runs % 2 !== 0 && is_out !== 1:
      // Switch the strike
      [onStrikeBatsman, nonStrikeBatsman] = [nonStrikeBatsman, onStrikeBatsman];
      break;

    case ball_number === 0 ||
      ball_number === 6 ||
			//@ts-ignore
      (is_out == 1 && ball_number !== 6 && ball_number !== 0):
      // Switch the strike at the end of the over or when the batsman is out on a non-zero ball number
      [onStrikeBatsman, nonStrikeBatsman] = [nonStrikeBatsman, onStrikeBatsman];
      break;

    case ballByBall.extra_type === "wide" ||
      ballByBall.extra_type === "no-ball":
      break;
  }
  return {
    onStrikeBatsman,
    nonStrikeBatsman,
  };
};

export default getPlayers;
