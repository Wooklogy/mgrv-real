import { AppTheme } from "@/styles/global.style";
import { translatePxValue } from "@/utils/style.util";
import { Radio, RadioProps } from "antd";
import { PropsWithChildren } from "react";
import styled, { css } from "styled-components";

export interface CustomRadioProps extends RadioProps {
  style_type?: "gradiant";
  border_color?: string;
  size?: number | string;
}
const CustomRadioBox: React.FC<PropsWithChildren<CustomRadioProps>> = (
  props
) => {
  return <CustomRadioStyle {...props}>{props?.children}</CustomRadioStyle>;
};
export default CustomRadioBox;

const CustomRadioStyle = styled(Radio)<CustomRadioProps>`
  ${(props) =>
    props.size &&
    css`
      .ant-checkbox-inner {
        width: ${translatePxValue(props.size)};
        height: ${translatePxValue(props.size)};

        &::after {
          width: ${translatePxValue(props.size)};
          height: ${translatePxValue(props.size)};
        }
      }
      .ant-checkbox {
        font-size: ${translatePxValue(props.size)};
      }
    `}
  :hover {
    .ant-radio-inner {
      border-color: ${AppTheme.color.primary_alpha} !important;
    }
  }
  .ant-radio-checked {
    ::after {
      border-color: ${AppTheme.color.primary} !important;
      transition: none;
    }
  }

  .ant-radio-checked {
    .ant-radio-inner {
      border: 1px solid ${(props) => AppTheme.color.primary};
      background-color: ${AppTheme.color.primary} !important;
    }
  }
`;
