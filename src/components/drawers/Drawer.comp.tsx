import { Drawer, DrawerProps } from "antd";
import { PropsWithChildren } from "react";

import styled from "styled-components";

export interface CustomDrawerProps extends DrawerProps {}
const CustomDrawer: React.FC<PropsWithChildren<CustomDrawerProps>> = (
  props
) => {
  const { children } = props;

  return (
    <CustomDrawerStyle {...props} closable={false}>
      {children}
    </CustomDrawerStyle>
  );
};

export default CustomDrawer;

const CustomDrawerStyle = styled(Drawer)<CustomDrawerProps>``;
