/* eslint-disable react-hooks/exhaustive-deps */
import usePrincipal from "@/hooks/usePrincipal";
import i18n from "@/locales/i18next";
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
import CustomFooterLayout from "./Footer.layout";
import CustomHeaderLayout from "./Header.layout";

const DefaultLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { refreshPrincipal } = usePrincipal();

  const [, setResize] = useRecoilState(recoilState_Resize);
  const [, setScrollY] = useRecoilState(recoilState_ScrollY);

  const handleResize = () => {
    setResize(window.innerWidth);
  };

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  React.useEffect(() => {
    setResize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  React.useEffect(() => {
    refreshPrincipal();
    if (i18n.language !== localStorage.getItem("SET_LANGUAGE")) {
      i18n.changeLanguage(localStorage.getItem("SET_LANGUAGE") || "en-US");
    }
  }, [router.pathname]);
  return (
    <>
      <LocalLayoutStyle>
        <CustomHeaderLayout></CustomHeaderLayout>
        <Layout.Content>{children}</Layout.Content>
        <CustomFooterLayout></CustomFooterLayout>
      </LocalLayoutStyle>
    </>
  );
};

export default DefaultLayout;

const LocalLayoutStyle = styled(Layout)`
  background-color: ${AppTheme.color.white};
  min-width: 100%;
  width: 100vw;
  background: "white";
  min-height: "100vh";
  position: "relative";
`;
