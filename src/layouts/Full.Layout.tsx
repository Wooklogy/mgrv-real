import CustomRow from "@/components/grids/Row.grid";
import React, { PropsWithChildren } from "react";
import styled, { css } from "styled-components";

const FullLayout: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <FullLayoutStyle>{children}</FullLayoutStyle>;
};
export default FullLayout;
export const ResponseFullLayoutCSS = css`
  padding: 0 64px;
  @media all and (max-width: 1440px) {
    padding: 0 32px;
  }
  @media all and (max-width: 1024px) {
    padding: 0 16px;
  }
`;
const FullLayoutStyle = styled(CustomRow)`
  ${ResponseFullLayoutCSS}
  margin: 0 auto;
  width: 100%;
  max-width: 2560px;
`;
