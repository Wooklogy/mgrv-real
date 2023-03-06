import { translatePxValue } from "@/utils/globals.util";
import { Col, ColProps } from "antd";
import { PropsWithChildren } from "react";
import styled from "styled-components";
export interface CustomColProps extends ColProps {
  width?: string | number;
  height?: string | number;
  overflow?: "hidden" | "visible";
}

const CustomCol: React.FC<PropsWithChildren<CustomColProps>> = (props) => {
  return <CustomColStyle {...props}>{props?.children}</CustomColStyle>;
};
export default CustomCol;
const CustomColStyle = styled(Col)<CustomColProps>`
  width: ${(props) => translatePxValue(props.width)};
  height: ${(props) => translatePxValue(props.height)};

  overflow-x: ${(props) => props.overflow};
`;
