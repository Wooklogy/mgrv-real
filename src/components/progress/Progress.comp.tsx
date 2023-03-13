import { translatePxValue } from "@/utils/style.util";
import { Progress, ProgressProps } from "antd";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import CustomRow from "../grids/Row.grid";

export interface CustomProgressProps extends ProgressProps {
  _width?: string | number;
}
const CustomProgress: React.FC<PropsWithChildren<CustomProgressProps>> = (
  props
) => {
  const { children } = props;
  const Format = () => {
    return <FormatStyle>{children}</FormatStyle>;
  };
  return <CustomProgressStyle {...props} format={Format}></CustomProgressStyle>;
};

export default CustomProgress;

const CustomProgressStyle = styled(Progress)<CustomProgressProps>`
  .ant-progress-text {
    height: 100% !important;
    padding: ${(props) => translatePxValue(props.strokeWidth || 10)} !important;
  }
  .ant-progress-inner {
    width: ${(props) => translatePxValue(props._width)} !important;
    height: ${(props) => translatePxValue(props._width)} !important;
  }
`;
const FormatStyle = styled(CustomRow)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
