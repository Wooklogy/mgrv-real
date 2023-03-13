import CustomRow from "@/components/grids/Row.grid";
import { AppResolution, HeaderHeight } from "@/styles/global.style";
import { Spin } from "antd";
import React, { PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { InventoryAnimationDiv } from "./Inventory.layout";
export interface ResponseLayoutProps {
  loading?: boolean;
}
const ResponseLayout: React.FC<PropsWithChildren<ResponseLayoutProps>> = (
  props
) => {
  const { children } = props;
  return (
    <ResponseLayoutStyle>
      <InventoryAnimationDiv>
        <Spin spinning={props?.loading || false}>{children}</Spin>
      </InventoryAnimationDiv>
    </ResponseLayoutStyle>
  );
};
export const ResponseCenterLayout: React.FC<
  PropsWithChildren<ResponseLayoutProps>
> = (props) => {
  const { children } = props;
  return (
    <ResponseCenterLayoutStyle>
      <InventoryAnimationDiv>
        <Spin spinning={props?.loading || false}>{children}</Spin>
      </InventoryAnimationDiv>
    </ResponseCenterLayoutStyle>
  );
};
export default ResponseLayout;
export const ResponseLayoutCSS = css`
  @media all and (max-width: ${AppResolution[0]}px) {
    max-width: 1920px;
  }
  @media all and (max-width: 1920px) {
    max-width: 1440px;
  }
  @media all and (max-width: 1440px) {
    max-width: 1024px;
  }
  @media all and (max-width: 1023px) {
    max-width: 768px;
  }
  @media all and (max-width: 767px) {
    max-width: 600px;
  }
`;
export const ResponseCenterLayoutCSS = css`
  @media all and (max-width: ${AppResolution[0]}px) {
    max-width: 1024px;
  }
  @media all and (max-width: 1023px) {
    max-width: 768px;
  }
  @media all and (max-width: 767px) {
    max-width: 600px;
  }
`;
const ResponseLayoutStyle = styled(CustomRow)`
  ${ResponseLayoutCSS}
  margin: 0 auto;
  margin-top: ${HeaderHeight}px;
  width: 100%;
  max-width: 2560px;

  .ant-spin-nested-loading {
    width: inherit;
    height: inherit;
  }
`;
const ResponseCenterLayoutStyle = styled(CustomRow)`
  ${ResponseCenterLayoutCSS}
  margin: 0 auto;
  margin-top: ${HeaderHeight}px;
  width: 100%;
  max-width: 2560px;

  .ant-spin-nested-loading {
    width: inherit;
    height: inherit;
  }
`;
