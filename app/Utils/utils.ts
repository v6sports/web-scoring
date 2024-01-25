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

export { showAlert };
