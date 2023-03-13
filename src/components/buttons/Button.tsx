import { AppTheme } from "@/styles/global.style";
import { translatePxValue } from "@/utils/style.util";
import { Spin } from "antd";
import { PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { cursorType } from "../texts/Text.d";

export interface CustomButtonProps
  extends Pick<
    React.HTMLAttributes<HTMLButtonElement>,
    "onClick" | "className"
  > {
  width?: number | string;
  height?: number | string;
  active?: boolean;
  bg_color?: string;
  border_color?: string;
  border_px?: number;
  loading?: boolean;
  radius_px?: number | string;
  cursor?: cursorType;
  disabled?: boolean;
  size?: "large" | "normal" | "small";
  style_type?: "primary" | "normal" | "line" | "secondary";
}
const CustomButton: React.FC<PropsWithChildren<CustomButtonProps>> = (
  props
) => {
  const { children } = props;
  return (
    <CustomButtonStyle {...props}>
      {props.loading ? (
        <Spin spinning={props.loading}>{children}</Spin>
      ) : (
        children
      )}
    </CustomButtonStyle>
  );
};
export default CustomButton;
const CustomButtonStyle = styled.button<CustomButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => translatePxValue(props.width || "7.5rem")};
  height: ${(props) => translatePxValue(props.height || "2.5rem")};
  ${(props) =>
    props.size === "large"
      ? css`
          width: 10rem;
          height: 3rem;
        `
      : props.size === "small"
      ? css`
          width: 5.5rem;
          height: 2rem;
        `
      : css``};
  cursor: ${(props) => props.cursor};
  background-color: ${(props) => {
    const result_color = props?.bg_color
      ? props.bg_color
      : props.style_type === "primary"
      ? AppTheme.color.primary
      : props.style_type === "line"
      ? "transparent"
      : props.style_type === "secondary"
      ? AppTheme.color.primary_alpha
      : AppTheme.color.primary;
    return result_color;
  }};
  transition: box-shadow 150ms;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.35);
  :hover {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.35);
  }
  :active {
    box-shadow: inset -1px 1px 4px rgb(0 0 0 / 35%);
  }
  border-radius: ${(props) => translatePxValue(props.radius_px || 6)};
  border: ${(props) => translatePxValue(props.border_px || 1)} solid
    ${(props) => props.border_color || "transparent"};

  ${(props) =>
    props.style_type === "line" &&
    css`
      border-color: ${AppTheme.color.primary};
    `}
  ${(props) => {
    if (!props.disabled) return;
    return css`
      cursor: no-drop;
      :hover {
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.35);
      }
      :active {
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.35);
      }
      filter: grayscale(0.5);
    `;
  }}
  ${(props) =>
    props.active &&
    css`
      background-color: ${AppTheme.color.primary};
    `}
`;
