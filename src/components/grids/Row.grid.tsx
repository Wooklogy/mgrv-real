import { translatePxValue } from "@/utils/style.util";
import { Row, RowProps } from "antd";
import { PropsWithChildren } from "react";
import styled from "styled-components";
export interface CustomRowProps extends RowProps {
  width?: string | number;
  height?: string | number;
}

const CustomRow: React.FC<PropsWithChildren<CustomRowProps>> = (props) => {
  return <CustomRowStyle {...props}>{props?.children}</CustomRowStyle>;
};
export default CustomRow;
const CustomRowStyle = styled(Row)<CustomRowProps>`
  width: ${(props) => translatePxValue(props.width || "100%")};
  height: ${(props) => translatePxValue(props.height)};
`;
