import { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import axios from "axios";

/**
 * Component for adding a player.
 */

interface BatsmanProps {
  selector: any;
	name?: string;
}

const AddPlayer: React.FC<BatsmanProps> = (props) => {
  let {selector={},name='Add Player'} = props;
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  /**
   * Generates a random email based on the provided name.
   * @param name - The name used to generate the email.
   */
  const generateRandomEmail = (name: string) => {
    if (name !== undefined && name !== null && name !== "") {
      const randomEmail = `${name
        .replace(/\s/g, "")
        .toLowerCase()}@example.com`;
      setEmail(randomEmail);
    }
  };

  /**
   * Generates a random phone number.
   */
  const generateRandomPhone = () => {
    const randomPhone = Math.floor(Math.random() * 9000000000) + 1000000000;
    setPhone(randomPhone.toString());
  };

  /**
   * Handles form submission.
   * @param values - The form values.
   */
  const onFinish = async (values: any) => {
    console.log(selector);
    const addPlayer = await axios.post(
      `/api/addPlayerApi?matchId=${selector.match_id}&teamId=${selector.selectedTeamId}`,
      values
    ).then(res=>{

			message.success('Player added successfully');
			window.location.reload();
		});
    // You can perform further actions with the form values here
  };

  return (
    <Form
      form={form}
      className="flex flex-col justify-center items-center"
      onFinish={onFinish}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter a name" }]}
      >
        <Input
          placeholder="Player Name"
          style={{ color: "black", backgroundColor: "white" }}
        />
      </Form.Item>
      <Form.Item label="Email" name="email" initialValue={email}>
        <Input
          placeholder="Player Email"
          style={{ color: "black", backgroundColor: "white" }}
        />
      </Form.Item>
      <Form.Item label="Phone" name="phone" initialValue={phone}>
        <Input
          placeholder="Player Phone Number"
          style={{ color: "black", backgroundColor: "white" }}
        />
      </Form.Item>
      <Button
        type="primary"
        className="bg-black text-white rounded-lg mb-4 uppercase"
        htmlType="submit"
      >
        {name}
      </Button>
    </Form>
  );
};

export default AddPlayer;
