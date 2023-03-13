import { AppTheme } from "@/styles/global.style";
import { translatePxValue, translateWeightValue } from "@/utils/style.util";
import React, { PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { CustomTextProps } from "./Text.d";

const CustomText: React.FC<PropsWithChildren<CustomTextProps>> = (props) => {
  const className = ` flex align-center justify-start ${
    props.italic && "text-italic"
  } ${props.underline && "text-underline"} ${
    props.text_overflow && "text-overflow"
  }`;
  const handleClipboard = () => {
    clipBoard(props?.clipboard_value || "");
  };
  return (
    <CustomTextStyle
      {...props}
      className={props.class_name + className}
      onClick={(e) => {
        props.clipboard_value && handleClipboard();
        props.onClick && props.onClick(e);
      }}
    >
      {props.children}
    </CustomTextStyle>
  );
};

export default CustomText;

const CustomTextStyle = styled.span<CustomTextProps>`
  font-family: ${(props) => props.font_family};

  cursor: ${(props) => props?.cursor};
  width: ${(props) => props.width && translatePxValue(props.width)};
  height: ${(props) =>
    (props.height && translatePxValue(props.height)) || "auto"};
  ${(props) => {
    const { size } = props;
    const fontSize =
      size === "ti"
        ? AppTheme.font_size.ti
        : size === "lg"
        ? AppTheme.font_size.lg
        : size === "sm"
        ? AppTheme.font_size.sm
        : size === "xl"
        ? AppTheme.font_size.xl
        : size === "xxl"
        ? AppTheme.font_size.xxl
        : size === "xxxl"
        ? AppTheme.font_size.xxxl
        : size === "xxxl"
        ? AppTheme.font_size.title
        : size === "abstract"
        ? AppTheme.font_size.abstract
        : typeof size === "number"
        ? size
        : typeof size === "string"
        ? size
        : AppTheme.font_size.de;
    return css`
      font-size: ${translatePxValue(fontSize)};
      svg {
        width: ${translatePxValue(fontSize)};
      }
    `;
  }};
  font-weight: ${(props) => translateWeightValue(props.weight)};
  color: ${(props) => props?.color || AppTheme?.color?.text || AppTheme.color};
  color: ${(props) =>
    props.style_type === "primary"
      ? AppTheme.color.primary
      : props.style_type === "success"
      ? AppTheme.color.success
      : props.style_type === "error"
      ? AppTheme.color.error
      : props.color};
  ${(props) =>
    props.hover &&
    css`
      :hover {
        fill: ${props.active_color ||
        AppTheme.color.primary ||
        AppTheme.color.text} !important;
        color: ${props.active_color ||
        AppTheme.color.primary ||
        AppTheme.color.text} !important;
      }
    `}
  ${(props) =>
    props.toggle &&
    css`
      fill: ${props.active_color ||
      AppTheme.color.primary ||
      AppTheme.color.text} !important;
      color: ${props.active_color ||
      AppTheme.color.primary ||
      AppTheme.color.text} !important;
    `};
`;

export async function clipBoard(text: string): Promise<boolean> {
  if (!navigator.clipboard) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.position = "fixed";

    document.body.appendChild(textarea);
    // focus() -> 사파리 브라우저 서포팅
    textarea.focus();
    // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
    textarea.select();
    // 흐름 5.
    document.execCommand("copy");
    // 흐름 6.
    document.body.removeChild(textarea);
    return true;
  } else {
    const result: boolean = await navigator.clipboard
      .writeText(text)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
    return result;
  }
}
