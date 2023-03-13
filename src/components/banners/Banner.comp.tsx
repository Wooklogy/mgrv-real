import { recoilState_Resize } from "@/recoils/states.recoil";
import { AppTheme, ResoulutionReturner } from "@/styles/global.style";
import { translatePxValue } from "@/utils/style.util";
import { t } from "i18next";
import Image from "next/image";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import CustomButton from "../buttons/Button";
import CustomText from "../texts/Text";

export interface BannerItemProps
  extends Pick<React.HTMLAttributes<HTMLDivElement>, "className"> {
  src: string;

  width?: number | string;
  height?: number | string;

  children?: string | React.ReactNode;

  imgLeft?: number | string;
  imgTop?: number | string;
  imgRight?: number | string;
  imgBottom?: number | string;
  imgWidth?: number | string;
  imgHeight?: number | string;
}

const CustomBanner: React.FC<BannerItemProps> = (props) => {
  const windowWidth = useRecoilValue(recoilState_Resize);
  return (
    <CustomBannerStyle {...props}>
      <Image src={props.src} alt={props.src} fill></Image>
      <div className="overlay"></div>
      <div className="banner-content-area">
        <CustomText
          size={ResoulutionReturner(
            windowWidth,
            "2.5rem",
            "2.5rem",
            "lg",
            "sm"
          )}
          weight="bold"
          color={AppTheme.color.white}
        >
          {t("main.buynode")}
        </CustomText>
        <CustomText
          size={ResoulutionReturner(
            windowWidth,
            "2.5rem",
            "2.5rem",
            "lg",
            "sm"
          )}
          weight="bold"
          color={AppTheme.color.white}
        >
          {t("main.benefits")}
        </CustomText>
        <CustomButton>
          <CustomText weight={"bold"} color={AppTheme.color.white}>
            {t("main.1puchase")}
          </CustomText>
        </CustomButton>
      </div>
    </CustomBannerStyle>
  );
};

export default CustomBanner;

const CustomBannerStyle = styled.div<BannerItemProps>`
  position: relative;

  width: ${(props) => translatePxValue(props.width || "100%")};
  height: ${(props) => translatePxValue(props.height || "100%")};

  img {
    position: absolute;
    object-fit: cover;
    left: ${(props) => translatePxValue(props.imgLeft) || 0};
    top: ${(props) => translatePxValue(props.imgTop) || 0};
    bottom: ${(props) => translatePxValue(props.imgBottom) || ""};
    right: ${(props) => translatePxValue(props.imgRight) || ""};
    width: ${(props) => translatePxValue(props.imgWidth) || "100%"};
    height: ${(props) => translatePxValue(props.imgHeight) || "auto"};
  }
  .banner-content-area {
    position: relative;
    top: 0;
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
  }
`;
