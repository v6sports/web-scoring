// components/CustomModal.tsx
import { Modal } from "antd";
import { ModalProps } from "antd/lib/modal";
import { ReactNode } from "react";

interface CustomModalProps extends ModalProps {
  children: ReactNode;
  visible: boolean;
  hide: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  children,
  visible,
  hide,
  ...modalProps
}) => {
  const handleCancel = () => {
    hide();
  };

  return (
    <Modal visible={visible} styles={{footer:{
			background:"#d8d8d8",
			borderRadius:20
		}}} onOk={handleCancel} onCancel={handleCancel} {...modalProps}>
      {children}
    </Modal>
  );
};

export default CustomModal;
