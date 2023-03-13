import { AppTheme } from "@/styles/global.style";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { AiFillAndroid, AiFillApple, AiFillWindows } from "react-icons/ai";
import styled from "styled-components";
import CustomButton from "../buttons/Button";
import CustomCol from "../grids/Col.grid";
import CustomRow from "../grids/Row.grid";
import CustomText from "../texts/Text";

import CustomBox, { CustomBoxProps } from "./Box.comp";

export interface CustomBoxGameProps extends CustomBoxProps {
  src: string;
  title: string;
  genre?: string;
  link?: string;
  button_text?: string;
  window?: boolean;
  ios?: boolean;
  android?: boolean;
  soon?: boolean;

  window_link?: string;
  android_link?: string;
  ios_link?: string;
}

const CustomBoxGame: React.FC<CustomBoxGameProps> = (props) => {
  const { t } = useTranslation();
  return (
    <CustomBoxGameStyle {...props}>
      <CustomRow className="box-img" height={"70%"}>
        {props.src && (
          <Image src={props.src} alt={props.title} fill priority={true}></Image>
        )}
      </CustomRow>
      <CustomRow className="box-content" height={"30%"} align="top">
        {props.soon ? (
          <CustomRow justify={"center"} height={"100%"}>
            <CustomText
              weight={"bold"}
              size="lg"
              color={AppTheme.color.text_second}
            >
              COMMING SOON
            </CustomText>
          </CustomRow>
        ) : (
          <>
            <CustomCol
              span={14}
              height={"100%"}
              className="flex-column justify-around"
            >
              <CustomRow>
                <CustomText weight={"bold"} size="xl">
                  {props.title}
                </CustomText>
              </CustomRow>
              <CustomRow>
                <CustomText width={"100%"} weight={"bold"} style_type="primary">
                  {t("game.genre")}
                </CustomText>
                <CustomText weight={"bold"} size="ti">
                  {props.genre || ""}
                </CustomText>
              </CustomRow>
            </CustomCol>
            <CustomCol
              span={10}
              height={"100%"}
              className="flex-column justify-around"
            >
              <CustomRow className="gap-05 justify-center">
                {props.window && (
                  <CustomText
                    size="lg"
                    cursor="pointer"
                    width={"auto"}
                    onClick={() => {
                      if (!props.window_link) return;
                      window.open(props.window_link);
                    }}
                  >
                    <AiFillWindows />
                  </CustomText>
                )}
                {props.ios && (
                  <CustomText
                    size="lg"
                    cursor="pointer"
                    width={"auto"}
                    onClick={() => {
                      if (!props.ios_link) return;

                      window.open(props.ios_link);
                    }}
                  >
                    <AiFillApple />
                  </CustomText>
                )}
                {props.android && (
                  <CustomText
                    size="lg"
                    cursor="pointer"
                    width={"auto"}
                    onClick={() => {
                      if (!props.android_link) return;
                      window.open(props.android_link);
                    }}
                  >
                    <AiFillAndroid />
                  </CustomText>
                )}
              </CustomRow>
              <CustomRow className="justify-center margin-top-05">
                <CustomButton width={"100%"}>
                  <CustomText
                    weight={"bold"}
                    width={"auto"}
                    color={AppTheme.color.white}
                    onClick={() => {
                      if (!props.window_link) return;
                      window.open(props.window_link);
                    }}
                  >
                    {props.button_text || "DOWNLOAD"}
                  </CustomText>
                </CustomButton>
              </CustomRow>
            </CustomCol>
          </>
        )}
      </CustomRow>
    </CustomBoxGameStyle>
  );
};
export default CustomBoxGame;

const CustomBoxGameStyle = styled(CustomBox)<CustomBoxGameProps>`
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  transition: 250ms transform;
  :hover {
    transform: translateY(-10px);
  }
  .box-img {
    position: relative;
    overflow: hidden;
    img {
      object-fit: cover;
    }
  }
  .box-content {
    position: relative;
    padding: 8px 16px;
  }
`;
