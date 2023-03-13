import { AppTheme } from "@/styles/global.style";
import { translatePxValue } from "@/utils/style.util";
import { Input } from "antd";
import { TextAreaProps } from "antd/es/input";
import styled from "styled-components";

export interface CustomTextAreaProps extends TextAreaProps {
  height?: string | number;
  width?: string | number;
}
const CustomTextArea: React.FC<CustomTextAreaProps> = (props) => {
  return <CustomTextAreaStyle {...props}></CustomTextAreaStyle>;
};
export default CustomTextArea;
const CustomTextAreaStyle = styled(Input.TextArea)<CustomTextAreaProps>`
  resize: none !important;
  min-height: 25rem !important;
  width: ${(props) => translatePxValue(props.width)};
  height: ${(props) => translatePxValue(props.height)};

  :hover {
    border-color: ${AppTheme.color.primary} !important;
  }
  :focus {
    border-color: ${AppTheme.color.primary} !important;
    box-shadow: 0 0 6px ${AppTheme.color.primary} !important;
  }
`;
