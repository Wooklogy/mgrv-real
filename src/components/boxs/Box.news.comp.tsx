import { AppTheme } from "@/styles/global.style";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import CustomCol from "../grids/Col.grid";
import CustomRow from "../grids/Row.grid";
import CustomText from "../texts/Text";

import CustomBox, { CustomBoxProps } from "./Box.comp";

export interface CustomBoxProductProps extends CustomBoxProps {
  src?: string;
  title?: string;
  link?: string;
}

const CustomBoxNews: React.FC<CustomBoxProductProps> = (props) => {
  return (
    <CustomBoxNewsStyle
      {...props}
      onClick={() => {
        if (props.link) window.open(props.link, "_blank");
      }}
    >
      <CustomRow className="box-img" height={"65%"}>
        {props.src && (
          <Image src={props.src} alt={props.src} fill priority={true}></Image>
        )}
      </CustomRow>
      <CustomRow className="box-content" height={"35%"} align="top">
        <CustomRow className="flex-column justify-between" height={"100%"}>
          <CustomCol style={{ overflow: "hidden" }}>
            <CustomText size={"sm"} weight={700} color={AppTheme.color.black}>
              {props.title || "NO_TITLE"}
            </CustomText>
          </CustomCol>
        </CustomRow>
      </CustomRow>
    </CustomBoxNewsStyle>
  );
};
export default CustomBoxNews;

const CustomBoxNewsStyle = styled(CustomBox)<CustomBoxProductProps>`
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 16px;
  cursor: pointer;
  transition: 250ms transform;
  :hover {
    transform: translateY(-10px);
    .box-img {
      img {
        transform: scale(1.05);
      }
    }
  }
  .box-img {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    img {
      transition: 250ms transform;

      object-fit: cover;
    }
  }
  .box-content {
    position: relative;
    padding-top: 12px;
    background-color: ${AppTheme.color.white};
  }
`;
