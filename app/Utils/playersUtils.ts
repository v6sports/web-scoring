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
  const currentBatterWhoAreBatting =  key === 'batting' ? currentInningsData?.batting : currentInningsData?.bowling;

  const allPlayerListTeamA = matchData.match_details?.team_a_new_det;
  const allPlayerListTeamB = matchData.match_details?.team_b_new_det;
  let selectedPlayers:Player[] = [];
  if (allPlayerListTeamA?.team_id == battingTeamId && allPlayerListTeamA?.players && allPlayerListTeamB?.players) {
    selectedPlayers = key == "batting"
        ? allPlayerListTeamA?.players
        : allPlayerListTeamB?.players;
  }
  if (allPlayerListTeamB?.team_id == battingTeamId && allPlayerListTeamB?.players && allPlayerListTeamA?.players) {
    selectedPlayers =  key == "batting" ? allPlayerListTeamB?.players : allPlayerListTeamA.players;
  }
  if(currentBatterWhoAreBatting){

	  return removeCurrentSelectedPlayers(selectedPlayers, currentBatterWhoAreBatting);
  }
  else {
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

export default getPlayers;
