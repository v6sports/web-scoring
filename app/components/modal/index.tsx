// components/CustomModal.tsx
import { Button, Modal } from "antd";
import { ModalProps } from "antd/lib/modal";
import { ReactNode } from "react";

interface CustomModalProps extends ModalProps {
  children: ReactNode;
  visible: boolean;
  name?: string;
  hide: () => void;
  closeDisable?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  children,
  name,
  visible,
  closeDisable = false,
  hide,
  ...modalProps
}) => {
  const handleCancel = () => {
    hide();
  };

  return (
    <>
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
        <p className="flex justify-center items-center uppercase font-normal text-lg">
          {name}
        </p>
        {children}

        {!closeDisable && (
          <Button
            className=" bg-red-700 text-white uppercase p-8"
            block
            onClick={handleCancel}
          >
            Close
          </Button>
        )}
      </Modal>
      {name && (
        <Button
          onClick={() => handleCancel()}
          className="bg-black text-sm uppercase text-white"
          icon="+"
        >
          {name}
        </Button>
      )}
    </>
  );
};

export default CustomModal;
