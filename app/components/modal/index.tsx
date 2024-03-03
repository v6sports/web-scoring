// components/CustomModal.tsx
import { Button, Modal } from "antd";
import { ModalProps } from "antd/lib/modal";
import { ReactNode } from "react";

interface CustomModalProps extends ModalProps {
  children: ReactNode;
  visible: boolean;
  hide: () => void;
	closeDisable?:boolean
}

const CustomModal: React.FC<CustomModalProps> = ({
  children,
  visible,
	closeDisable=false,
  hide,
  ...modalProps
}) => {
  const handleCancel = () => {
    hide();
  };

  return (
    <Modal
      visible={visible}
      footer={null}
      styles={{
        footer: {
          background: "#d8d8d8",
          borderRadius: 20,
        },
      }}
      onOk={handleCancel}
      onCancel={handleCancel}
      {...modalProps}
    >
      {children}

      {!closeDisable && <Button
        className=" bg-red-700 text-white uppercase p-8"
        block
        onClick={handleCancel}
      >
        Close
      </Button>}
    </Modal>
  );
};

export default CustomModal;
