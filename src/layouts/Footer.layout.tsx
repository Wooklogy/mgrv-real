import SVGLogo from "public/svg/MGRV_white.svg";
import { Col, Layout, Row } from "antd";
import React, { PropsWithChildren } from "react";
import styled, { css } from "styled-components";

import {
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { RiTelegramFill } from "react-icons/ri";
import { FaDiscord } from "react-icons/fa";
import {
  LINK_DISCORD,
  LINK_FACEBOOK,
  LINK_INSTA,
  LINK_TELEGRAM,
  LINK_TWITTER,
  LINK_YOUTUBE,
} from "@/apis/link.api";
import { useRecoilValue } from "recoil";
import { recoilState_Resize } from "@/recoils/states.recoil";
import CustomRow from "@/components/grids/Row.grid";
import CustomCol from "@/components/grids/Col.grid";
import CustomText from "@/components/texts/Text";
import {
  AppResolution,
  AppTheme,
  ResoulutionReturner,
} from "@/styles/global.style";

const CustomFooterLayout: React.FC<PropsWithChildren> = () => {
  const windowWidth = useRecoilValue(recoilState_Resize);

  const PCmode = () => {
    return (
      <CustomRow height={"100%"}>
        <CustomCol span={10} className="flex-column justify-between">
          <CustomRow>
            <CustomText size="xxl" weight={"bold"}>
              JOIN US COMMUNITY
            </CustomText>
            <CustomRow className="margin-top-1 gap-05">
              <CustomText
                size="xxl"
                weight={"bold"}
                hover={true}
                onClick={() => {
                  window.open(LINK_TWITTER, "_blank");
                }}
              >
                <AiOutlineTwitter />
              </CustomText>
              <CustomText
                size="xxl"
                weight={"bold"}
                hover={true}
                onClick={() => {
                  window.open(LINK_INSTA, "_blank");
                }}
              >
                <AiFillInstagram />
              </CustomText>
              <CustomText
                size="xxl"
                weight={"bold"}
                hover={true}
                onClick={() => {
                  window.open(LINK_FACEBOOK, "_blank");
                }}
              >
                <AiFillFacebook />
              </CustomText>
              <CustomText
                size="xxl"
                weight={"bold"}
                hover={true}
                onClick={() => {
                  window.open(LINK_TELEGRAM, "_blank");
                }}
              >
                <RiTelegramFill />
              </CustomText>
              <CustomText
                size="xxl"
                weight={"bold"}
                hover={true}
                onClick={() => {
                  window.open(LINK_DISCORD, "_blank");
                }}
              >
                <FaDiscord />
              </CustomText>
            </CustomRow>
          </CustomRow>
          <CustomRow>
            <CustomCol className="flex align-center" span={3}>
              <CustomText size={"4.5rem"}>
                <SVGLogo fill={AppTheme.color.text}></SVGLogo>
              </CustomText>
            </CustomCol>
            <CustomRow className="margin-top-05">
              <CustomText size="ti">
                © MGROVE. All rights reserved. Terms and Conditions | Privacy
                Policy
              </CustomText>
            </CustomRow>
          </CustomRow>
        </CustomCol>
        <CustomCol span={10} offset={4}>
          <CustomRow className="flex justify-around align-start">
            <Col span={8} className="flex-column justify-center align-center">
              <CustomText size="lg" weight={"bold"}>
                Page links
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Store
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Node
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Game
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Ecosystem
              </CustomText>
            </Col>
            <Col span={8} className="flex-column justify-center align-center">
              <CustomText size="lg" weight={"bold"}>
                Useful links
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Get Nodes
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Support
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Privacy Settings
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Sign in
              </CustomText>
            </Col>
            <Col span={8} className="flex-column justify-center align-center">
              <CustomText size="lg" weight={"bold"}>
                Socials
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
                onClick={() => {
                  window.open(LINK_INSTA, "_blank");
                }}
              >
                Instagram
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
                onClick={() => {
                  window.open(LINK_TWITTER, "_blank");
                }}
              >
                Twitter
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
                onClick={() => {
                  window.open(LINK_DISCORD, "_blank");
                }}
              >
                Discord
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
                onClick={() => {
                  window.open(LINK_YOUTUBE, "_blank");
                }}
              >
                Youtube
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
                onClick={() => {
                  window.open(LINK_TELEGRAM, "_blank");
                }}
              >
                Telegram
              </CustomText>
            </Col>
          </CustomRow>
        </CustomCol>
      </CustomRow>
    );
  };
  const HorizonTabletMode = () => {
    return (
      <CustomRow height={"100%"}>
        <CustomCol span={24} className="flex-column justify-between">
          <CustomRow justify={"center"}>
            <CustomText size="xxl" weight={"bold"}>
              JOIN US COMMUNITY
            </CustomText>
            <CustomRow justify={"center"} className="margin-top-1 gap-05">
              <CustomText
                size="xxl"
                weight={"bold"}
                hover={true}
                onClick={() => {
                  window.open(LINK_TWITTER, "_blank");
                }}
              >
                <AiOutlineTwitter />
              </CustomText>
              <CustomText
                size="xxl"
                weight={"bold"}
                hover={true}
                onClick={() => {
                  window.open(LINK_INSTA, "_blank");
                }}
              >
                <AiFillInstagram />
              </CustomText>
              <CustomText
                size="xxl"
                weight={"bold"}
                hover={true}
                onClick={() => {
                  window.open(LINK_FACEBOOK, "_blank");
                }}
              >
                <AiFillFacebook />
              </CustomText>
              <CustomText
                size="xxl"
                weight={"bold"}
                hover={true}
                onClick={() => {
                  window.open(LINK_TELEGRAM, "_blank");
                }}
              >
                <RiTelegramFill />
              </CustomText>
              <CustomText
                size="xxl"
                weight={"bold"}
                hover={true}
                onClick={() => {
                  window.open(LINK_DISCORD, "_blank");
                }}
              >
                <FaDiscord />
              </CustomText>
            </CustomRow>
          </CustomRow>
        </CustomCol>
        <CustomCol span={24} className="margin-top-3">
          <CustomRow className="flex justify-around align-start">
            <Col span={8} className="flex-column justify-center align-center">
              <CustomText size="lg" weight={"bold"}>
                Page links
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Store
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Node
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Game
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Ecosystem
              </CustomText>
            </Col>
            <Col span={8} className="flex-column justify-center align-center">
              <CustomText size="lg" weight={"bold"}>
                Useful links
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Get Nodes
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Support
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Privacy Settings
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Sign in
              </CustomText>
            </Col>
            <Col span={8} className="flex-column justify-center align-center">
              <CustomText size="lg" weight={"bold"}>
                Socials
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
                onClick={() => {
                  window.open(LINK_INSTA, "_blank");
                }}
              >
                Instagram
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
                onClick={() => {
                  window.open(LINK_TWITTER, "_blank");
                }}
              >
                Twitter
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
                onClick={() => {
                  window.open(LINK_DISCORD, "_blank");
                }}
              >
                Discord
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
                onClick={() => {
                  window.open(LINK_YOUTUBE, "_blank");
                }}
              >
                Youtube
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
                onClick={() => {
                  window.open(LINK_TELEGRAM, "_blank");
                }}
              >
                Telegram
              </CustomText>
            </Col>
          </CustomRow>
        </CustomCol>
        <CustomCol
          className="flex align-center margin-top-3"
          span={22}
          offset={2}
        >
          <CustomText size={"4.5rem"}>
            <SVGLogo fill={AppTheme.color.text}></SVGLogo>
          </CustomText>
        </CustomCol>
        <CustomCol
          className="flex align-center margin-top-05"
          span={22}
          offset={2}
        >
          <CustomText size="ti">
            © MGROVE. All rights reserved. Terms and Conditions | Privacy Policy
          </CustomText>
        </CustomCol>
      </CustomRow>
    );
  };
  const MobileMode = () => {
    return (
      <CustomRow height={"100%"}>
        <CustomCol span={24} className="flex-column justify-between">
          <CustomRow justify={"center"}>
            <CustomText size="sm" weight={"bold"}>
              JOIN US COMMUNITY
            </CustomText>
            <CustomRow justify={"center"} className="margin-top-1 gap-05">
              <CustomText
                size="xxl"
                weight={"bold"}
                hover={true}
                onClick={() => {
                  window.open(LINK_TWITTER, "_blank");
                }}
              >
                <AiOutlineTwitter />
              </CustomText>
              <CustomText
                size="xxl"
                weight={"bold"}
                hover={true}
                onClick={() => {
                  window.open(LINK_INSTA, "_blank");
                }}
              >
                <AiFillInstagram />
              </CustomText>
              <CustomText
                size="xxl"
                weight={"bold"}
                hover={true}
                onClick={() => {
                  window.open(LINK_FACEBOOK, "_blank");
                }}
              >
                <AiFillFacebook />
              </CustomText>
              <CustomText
                size="xxl"
                weight={"bold"}
                hover={true}
                onClick={() => {
                  window.open(LINK_TELEGRAM, "_blank");
                }}
              >
                <RiTelegramFill />
              </CustomText>
              <CustomText
                size="xxl"
                weight={"bold"}
                hover={true}
                onClick={() => {
                  window.open(LINK_DISCORD, "_blank");
                }}
              >
                <FaDiscord />
              </CustomText>
            </CustomRow>
          </CustomRow>
        </CustomCol>
        <CustomCol span={24} className="margin-top-3">
          <CustomRow className="flex justify-around align-start">
            <Col span={24} className="flex-column justify-center align-center">
              <CustomText size="lg" weight={"bold"}>
                Page links
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Store
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Node
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Game
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Ecosystem
              </CustomText>
            </Col>
          </CustomRow>
          <CustomRow className="flex justify-around align-start margin-top-2">
            <Col span={24} className="flex-column justify-center align-center">
              <CustomText size="lg" weight={"bold"}>
                Useful links
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Get Nodes
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Support
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Privacy Settings
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
              >
                Sign in
              </CustomText>
            </Col>
          </CustomRow>
          <CustomRow className="flex justify-around align-start margin-top-2">
            <Col span={24} className="flex-column justify-center align-center">
              <CustomText size="lg" weight={"bold"}>
                Socials
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
                onClick={() => {
                  window.open(LINK_INSTA, "_blank");
                }}
              >
                Instagram
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
                onClick={() => {
                  window.open(LINK_TWITTER, "_blank");
                }}
              >
                Twitter
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
                onClick={() => {
                  window.open(LINK_DISCORD, "_blank");
                }}
              >
                Discord
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
                onClick={() => {
                  window.open(LINK_YOUTUBE, "_blank");
                }}
              >
                Youtube
              </CustomText>
              <CustomText
                class_name="margin-top-1"
                cursor="pointer"
                hover={true}
                onClick={() => {
                  window.open(LINK_TELEGRAM, "_blank");
                }}
              >
                Telegram
              </CustomText>
            </Col>
          </CustomRow>
        </CustomCol>
        <CustomCol
          className="flex align-center justify-center margin-top-5"
          span={22}
          offset={2}
        >
          <CustomText size={"5.5rem"}>
            <SVGLogo fill={AppTheme.color.text}></SVGLogo>
          </CustomText>
        </CustomCol>
        <CustomCol
          className="flex align-center justify-center margin-top-1"
          span={20}
          offset={2}
        >
          <CustomText size="ti">
            © MGROVE. All rights reserved. Terms and Conditions | Privacy Policy
          </CustomText>
        </CustomCol>
      </CustomRow>
    );
  };

  return (
    <CustomLaoutFooterStyle>
      {ResoulutionReturner(
        windowWidth,
        <PCmode />,
        <HorizonTabletMode />,
        <HorizonTabletMode />,
        <MobileMode />
      )}
    </CustomLaoutFooterStyle>
  );
};

export default CustomFooterLayout;

const CustomLaoutFooterStyle = styled(Layout.Footer)`
  padding: 2rem 8rem !important;
  width: 100%;
  margin: 0 auto;
  margin-top: 5rem;
  max-width: ${AppResolution[0]}px;
  bottom: 0;
`;
