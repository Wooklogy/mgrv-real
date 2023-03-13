import { translatePxValue } from "@/utils/style.util";
import { PropsWithChildren } from "react";
import styled from "styled-components";

type CustomBoxExtendType = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "onClick" | "style" | "onPointerEnter" | "onPointerLeave"
>;

export interface CustomBoxProps extends CustomBoxExtendType {
  width?: number | string;
  height?: number | string;

  border_color?: string;
  border_radius?: number;
  border_width?: number;

  background_color?: string;
}

const CustomBox: React.FC<PropsWithChildren<CustomBoxProps>> = (props) => {
  const { children } = props;
  return <CustomBoxStyle {...props}>{children}</CustomBoxStyle>;
};

export default CustomBox;

const CustomBoxStyle = styled.div<CustomBoxProps>`
  position: relative;
  width: ${(props) => translatePxValue(props.width || "100%")};
  height: ${(props) => translatePxValue(props.height || "100%")};
  border-radius: ${(props) => translatePxValue(props.border_radius || 0)};
  background-color: ${(props) => props?.background_color || "transparent"};
  border: ${(props) => {
    const width = props.border_width || 1;
    const color = props.border_color || "transparent";

    return `${width}px ${color} solid`;
  }};
  & > * {
    z-index: 1;
  }
`;
