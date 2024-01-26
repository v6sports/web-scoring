import { IballByBall } from "../interfaces/ballByBall.interface";
import { Iscoreboard, Player } from "../interfaces/matchScoreboard.interface";

interface IwhichTeamPlayers {
  key: "batting" | "bowling";
  matchData: Iscoreboard;
  currentInnings: 1 | 2 | 3 | 4;
}

const getPlayers = (props: IwhichTeamPlayers) => {
  const { key, matchData, currentInnings } = props;

  const currentInningsData = matchData.innings?.[currentInnings];
  const battingTeamId = currentInningsData?.team_id;
  const currentBatterWhoAreBatting =
    key === "batting"
      ? currentInningsData?.batting
      : currentInningsData?.bowling;

  const allPlayerListTeamA = matchData.match_details?.team_a_new_det;
  const allPlayerListTeamB = matchData.match_details?.team_b_new_det;
  let selectedPlayers: Player[] = [];
  if (
    allPlayerListTeamA?.team_id == battingTeamId &&
    allPlayerListTeamA?.players &&
    allPlayerListTeamB?.players
  ) {
    selectedPlayers =
      key == "batting"
        ? allPlayerListTeamA?.players
        : allPlayerListTeamB?.players;
  }
  if (
    allPlayerListTeamB?.team_id == battingTeamId &&
    allPlayerListTeamB?.players &&
    allPlayerListTeamA?.players
  ) {
    selectedPlayers =
      key == "batting"
        ? allPlayerListTeamB?.players
        : allPlayerListTeamA.players;
  }
  if (currentBatterWhoAreBatting) {
    return selectedPlayers; //removeCurrentSelectedPlayers(selectedPlayers, currentBatterWhoAreBatting);
  } else {
    return selectedPlayers;
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

  let { on_strike: onStrikeBatsman = -1, non_strike: nonStrikeBatsman = -1, runs=0, is_out, ball_number } = ballByBall;
	console.log(onStrikeBatsman,"SERVER SIDE")
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
	console.log(JSON.stringify(ballByBall),"before____QWERTY",ballByBall.runs,ballByBall.is_out);
  switch (true) {
		case ballByBall.extra_type == 'wide' ||  ballByBall.extra_type == 'no-ball':
				break;
    case is_out === 1 && (ball_number == 0 || ball_number == 6):
      onStrikeBatsman = nonStrikeBatsman;
      nonStrikeBatsman = -1;
      break;

    case is_out === 1 && (ball_number !== 0 || ball_number != 6):
      onStrikeBatsman = -1;
      break;

		case runs %2 !=0 && (ball_number === 0 || ball_number === 6):
			console.log('Cheers');
			break;

    case runs % 2 !== 0 && is_out !== 1:
      // Switch the strike
      [onStrikeBatsman, nonStrikeBatsman] = [nonStrikeBatsman, onStrikeBatsman];
      break;


    case (ball_number === 0 || ball_number === 6) || (is_out === 1 && (ball_number !== 6 || ball_number !== 0)):
      // Switch the strike at the end of the over or when the batsman is out on a non-zero ball number
      [onStrikeBatsman, nonStrikeBatsman] = [nonStrikeBatsman, onStrikeBatsman];
      break;
  }
	console.log(onStrikeBatsman,"after",nonStrikeBatsman);
  return {
    onStrikeBatsman,
    nonStrikeBatsman,
  };
};


export default getPlayers;
