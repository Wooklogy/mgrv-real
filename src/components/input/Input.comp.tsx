import { AppTheme } from "@/styles/global.style";
import { translatePxValue } from "@/utils/style.util";
import { Input, InputProps, Spin } from "antd";
import React from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import styled, { css } from "styled-components";

export interface CustomInputProps extends InputProps {
  border_color?: string;
  border_px?: number;
  bg_color?: string;
  font_size?: number;
  height?: number | string;
  width?: number | string;
  state?: "success" | "error";
  loading?: boolean;
  style_type?: "gradiant";
}
const CustomInput: React.FC<CustomInputProps> = (props) => {
  const [isOpenEye, setIsOpenEye] = React.useState<boolean>(false);

  const handleEyeClick = () => {
    setIsOpenEye(!isOpenEye);
  };

  return (
    <>
      {props.type == "password" ? (
        <CustomInputStyle
          {...props}
          type={(!isOpenEye && "password") || ""}
          suffix={
            isOpenEye ? (
              <BsEye onClick={handleEyeClick} className={"pointer"} />
            ) : (
              <BsEyeSlash onClick={handleEyeClick} className={"pointer"} />
            )
          }
        ></CustomInputStyle>
      ) : (
        <CustomInputStyle {...props}></CustomInputStyle>
      )}
    </>
  );
};
export default CustomInput;

const CustomInputStyle = styled(Input)<CustomInputProps>`
  width: ${(props) => translatePxValue(props.width || "100%")};
  height: ${(props) => translatePxValue(props.height || "2.5rem")};

  &:hover {
    border-color: ${AppTheme.color.primary} !important;
  }

  &:focus {
    box-shadow: 0 0 6px ${AppTheme.color.primary} !important;
    border-color: ${AppTheme.color.primary} !important;
  }
  font-size: ${(props) =>
    (props?.font_size && `${props?.font_size}px`) || AppTheme.font_size.de};
  color: ${(props) => props.color || AppTheme.color.text};
  background-color: ${(props) => props.bg_color};
  border: solid ${(props) => props.border_px || 1}px
    ${(props) => props.border_color || AppTheme.color.text_third};

  ${(props) => {
    switch (props.state) {
      case "success":
        return css`
          border-color: ${AppTheme.color.success};
        `;
      case "error":
        return css`
          border-color: ${AppTheme.color.error};
        `;
    }
  }}
`;
