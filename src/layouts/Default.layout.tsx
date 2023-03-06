import {
  recoilState_Resize,
  recoilState_ScrollY,
} from "@/recoils/states.recoil";
import { AppTheme } from "@/styles/global.style";
import { Layout } from "antd";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import WoHeaderLayout from "./Header.layout";

const DefaultLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const [, setResize] = useRecoilState(recoilState_Resize);
  const [, setScrollY] = useRecoilState(recoilState_ScrollY);

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [router.pathname]);

  const handleResize = () => {
    setResize(window.innerWidth);
  };

  const handleScroll = () => {
    setScrollY(document.body.scrollTop);
  };

  React.useEffect(() => {
    setResize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    document.body.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <LocalLayoutStyle>
        <LocalLayoutHeaderStyle>
          <WoHeaderLayout></WoHeaderLayout>
        </LocalLayoutHeaderStyle>
        <Layout.Content>{children}</Layout.Content>
        <LocalLayoutFooterStyle></LocalLayoutFooterStyle>
      </LocalLayoutStyle>
    </>
  );
};

export default DefaultLayout;

const LocalLayoutHeaderStyle = styled(Layout.Header)``;
const LocalLayoutStyle = styled(Layout)`
  background-color: ${AppTheme.color.white};
  min-width: 100%;
  width: 100vw;
`;
const LocalLayoutFooterStyle = styled(Layout.Footer)`
  position: fixed;
  margin: 0 !important;
  padding: 0 !important;
  height: fit-content !important;
  width: 100vw;
`;
