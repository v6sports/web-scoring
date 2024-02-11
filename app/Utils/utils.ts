import { message } from "antd";

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
export { showAlert, checkNullfy, calculateStrikeRate, inningsRunRate };
