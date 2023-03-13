import { AppTheme } from "@/styles/global.style";
import { translatePxValue } from "@/utils/style.util";
import React from "react";
import styled from "styled-components";

export interface OTPInputerProps {
  height?: string | number;
  font_size?: string | number;
  type?: "password";
  width?: string | number;
  maxcount: number;
  value?: string | number;
  font_color?: string;
  border_color?: string;
  bg_color?: string;
  gap?: string | number;
  onCustomKeyDown?: (value?: React.KeyboardEvent<HTMLInputElement>) => void;
  onCustomChange?: (value?: any) => void;
}

const OTPInput: React.FC<OTPInputerProps> = (props) => {
  const getValue = (): string => {
    const inputer = document.getElementsByClassName("OTP-TEXT-INPUTER") as
      | HTMLInputElement[]
      | any;

    let result = "";
    for (let i = 0; i < inputer.length; i++) {
      result += inputer[i].value;
    }

    return result;
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputer = document.getElementsByClassName("OTP-TEXT-INPUTER") as
      | HTMLInputElement[]
      | any;
    if (props?.onCustomKeyDown) props?.onCustomKeyDown(e);
    if (e.code == "Backspace") {
      const focusEle = document.activeElement as HTMLInputElement;

      for (let i = 0; i < inputer.length; i++) {
        if (inputer[i] == focusEle) {
          if (i > 0) {
            inputer[i].value = null;
            setTimeout(() => {
              inputer[i - 1].focus();
            }, 1);
            break;
          }
        }
      }
      if (props?.onCustomChange) props?.onCustomChange(getValue());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const focusEle = document.activeElement as HTMLInputElement;

    const test = document.getElementsByClassName("OTP-TEXT-INPUTER") as
      | HTMLInputElement[]
      | any;

    const value = String(e.target?.value);

    if (value === undefined || value.length <= 0) return;
    if (value?.length > 2) {
      //   여러개를 한번에 입력할 경우 (복붙)
      for (let i = 0; i < test.length; i++) {
        if (value[i]) test[i].value = value[i];
        else test[i].value = null;
      }
      if (props?.onCustomChange) props?.onCustomChange(getValue());
      return;
    } else {
      //   한개씩 입력할 경우
      focusEle.value = "";
      for (let i = 0; i < test.length; i++) {
        if (test[i].value.length === 0) {
          for (let q = i; q < test.length; q++) {
            test[q].value = "";
          }

          test[i].value = String(value)[value.length - 1];
          if (i + 1 < test.length) test[i + 1].focus();
          if (props?.onCustomChange) props?.onCustomChange(getValue());
          break;
        }
      }
    }

    if (focusEle.value.length > 1) {
      focusEle.value = String(e.target.value)[e.target.value.length - 1];
    }
  };

  let Nan = 0;
  return (
    <OTPInputerStyle {...props}>
      {Array.from(Array(props.maxcount), () => {
        Nan++;
        return (
          <OTPInputStyle
            {...props}
            type={props?.type}
            className={`OTP-TEXT-INPUTER`}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            key={`OTP-NUM-INPUTER${Nan}`}
          ></OTPInputStyle>
        );
      })}
    </OTPInputerStyle>
  );
};

export default OTPInput;

const OTPInputerStyle = styled.div<OTPInputerProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: ${(props) => translatePxValue(props.gap)};
  height: ${(props) => translatePxValue(props.height || "100%")};
  input {
    color: ${(props) => props.font_color || AppTheme.color.text};
    height: 100%;
    border-radius: 20px;
    width: ${(props) => translatePxValue(props.width)};
    border: 2px solid ${(props) => props.border_color || AppTheme.color.primary};

    background-color: white;
    text-align: center;
    font-size: ${(props) => translatePxValue(props.font_size)};
  }
`;

const OTPInputStyle = styled.input<OTPInputerProps>`
  :hover {
    background-color: ${(props) => props.bg_color || "transparent"};
    ${(props) => props.border_color || AppTheme.color.primary};

    outline: none;
  }
  :focus {
    background-color: ${(props) => props.bg_color || "transparent"};
    border: 3px solid ${AppTheme.color.primary};
    outline: none;
  }
`;
