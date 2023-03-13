import { AppTheme } from "@/styles/global.style";
import { Modal, ModalProps } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import CustomBox from "../boxs/Box.comp";
import ChildHistory from "../child/history.child";
import CustomText from "../texts/Text";

export interface CustomModalProps extends ModalProps {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
const HistoryModal: React.FC<CustomModalProps> = (props) => {
  return (
    <ModalHistoryStyle
      {...props}
      width={"80rem"}
      open={props?.isOpen}
      footer={null}
      centered={true}
      keyboard={true}
      mask={true}
      closable={false}
    >
      <CustomBox
        border_radius={12}
        style={{ padding: "2rem 4rem", paddingBottom: "5rem" }}
        background_color={AppTheme.color.white}
        width={"80rem"}
      >
        <CustomText
          cursor="pointer"
          onClick={() => {
            if (props.setIsOpen) props.setIsOpen(false);
          }}
          hover={true}
          style={{
            position: "absolute",
            right: "1rem",
            top: "1rem",
          }}
        >
          <AiOutlineClose></AiOutlineClose>
        </CustomText>
        <ChildHistory></ChildHistory>
      </CustomBox>
    </ModalHistoryStyle>
  );
};
export default HistoryModal;
const ModalHistoryStyle = styled(Modal)`
  & .ant-modal-content {
    position: relative;
    background-color: transparent;
    box-shadow: none;
  }
  box-shadow: none;
`;
