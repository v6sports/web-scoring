import { message } from "antd";
import  Axios  from "axios";

const showAlert = (
  msg: string,
  type: "warning" | "error" | "info" = "info"
) => {
  message.destroy();
  if (type == "error") {
    return message.error(msg);
  }
  if (type == "warning") {
    return message.warning(msg);
  } else {
    return message.error(msg);
  }
};

/**
 *
 * @param data
 * @returns
 */

const checkNullfy = (data: string | number) => {
  if (data == -1) return false;
  if (!data) return false;
  else return true;
};

let fetchScoreApi = async (matchId: string, inning_number: string) => {
  if (matchId && inning_number) {
    return await Axios.request({
      url: "/api/readScore",
      method: "post",
      data: {
        match_id: matchId,
        inning_number: inning_number,
      },
    });
  } else return false;
};
const calculateStrikeRate = (runs: number, ball: number) => {
  let strikeRate = (runs / ball) * 100;
  if (strikeRate) return strikeRate.toFixed(1);
  else return 0;
};

const inningsRunRate = (runs: number, balls: number) => {
  if (balls == 0 || runs == 0) return 0;
  let rr = (runs / balls) * 6;
  return rr ? rr.toFixed(2) : 0;
};

const wagonWheelShort = (pointX:number,pointY:number) => {

  if(pointX && pointY) {
    if(pointX > 75 && pointX <  120){
      // Fine Leg
      return 5;
    }
    if(pointX > 120 && pointX <  140){
       // Deep Square Leg
      return 14;
    }
    if(pointX > 124 && pointX <  120){
      // "Deep Mid Wicket";
      return 15;
    }
  }
}
export {
  showAlert,
  checkNullfy,
  calculateStrikeRate,
  inningsRunRate,
  fetchScoreApi,
};
