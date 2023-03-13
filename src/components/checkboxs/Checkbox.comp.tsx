import { AppTheme } from "@/styles/global.style";
import { translatePxValue } from "@/utils/style.util";
import { Checkbox, CheckboxProps } from "antd";
import { PropsWithChildren } from "react";
import styled, { css } from "styled-components";

export interface CustomCheckboxProps extends CheckboxProps {
  style_type?: "gradiant";
  border_color?: string;
  size?: number | string;
}
const CustomCheckBox: React.FC<PropsWithChildren<CustomCheckboxProps>> = (
  props
) => {
  return (
    <CustomCheckBoxStyle {...props}>{props?.children}</CustomCheckBoxStyle>
  );
};
export default CustomCheckBox;

const CustomCheckBoxStyle = styled(Checkbox)<CustomCheckboxProps>`
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
    .ant-checkbox-inner {
      border-color: ${AppTheme.color.primary_alpha} !important;
    }
  }
  .ant-checkbox-checked {
    ::after {
      border-color: ${AppTheme.color.primary} !important;
      transition: none;
    }
  }

  .ant-checkbox-checked {
    .ant-checkbox-inner {
      border: 1px solid ${AppTheme.color.primary || AppTheme.color.placehoder};
      background-color: ${AppTheme.color.primary} !important;
    }
  }
`;
