import { AppTheme } from "@/styles/global.style";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import CustomCol from "../grids/Col.grid";
import CustomRow from "../grids/Row.grid";
import CustomText from "../texts/Text";

import CustomBox, { CustomBoxProps } from "./Box.comp";

export interface CustomBoxProductProps extends CustomBoxProps {
  from?: string;
  src?: string;
  title?: string | React.ReactNode;
  soon?: boolean;
  price?: number;
}

const CustomBoxProduct: React.FC<CustomBoxProductProps> = (props) => {
  const [isHovered, setHovered] = React.useState(false);

  return (
    <CustomBoxProductStyle
      {...props}
      onPointerEnter={() => {
        setHovered(true);
      }}
      onPointerLeave={() => {
        setHovered(false);
      }}
    >
      {isHovered && !props.soon && (
        <BackLight
          animate={{
            filter: `hue-rotate(${175}deg)`,
          }}
          transition={{
            duration: 1,
            repeatType: "reverse",
            repeat: Infinity,
          }}
        ></BackLight>
      )}

      <CustomRow className="box-img" height={"60%"}>
        {props.src && (
          <Image src={props.src} alt={props.src} fill priority={true}></Image>
        )}
      </CustomRow>
      <CustomRow className="box-content" height={"40%"} align="top">
        {props.soon ? (
          <CustomCol
            height={"100%"}
            span={24}
            className="flex justify-center align-center"
          >
            <CustomText
              weight={"bold"}
              size="sm"
              color={AppTheme.color.text_third}
            >
              COMING SOON
            </CustomText>
          </CustomCol>
        ) : (
          <CustomRow className="flex-column justify-between" height={"100%"}>
            <CustomCol>
              <CustomText weight={700} color={AppTheme.color.text_second}>
                {props.from || "MGROVE"}
              </CustomText>
              <CustomText
                width={"100%"}
                text_overflow={true}
                weight={700}
                color={AppTheme.color.text}
              >
                {props.title || "NO TITLE"}
              </CustomText>
            </CustomCol>
            <CustomCol>
              <CustomText weight={700} color={AppTheme.color.primary}>
                {props.from || "PRICE"}
              </CustomText>
              <CustomText
                width={"100%"}
                text_overflow={true}
                size="sm"
                weight={700}
                color={AppTheme.color.text}
              >
                {Number(props?.price || 0).toLocaleString()} MGRV
              </CustomText>
            </CustomCol>
          </CustomRow>
        )}
      </CustomRow>
    </CustomBoxProductStyle>
  );
};
export default CustomBoxProduct;

const CustomBoxProductStyle = styled(CustomBox)<CustomBoxProductProps>`
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: 250ms transform;
  filter: ${(props) => props.soon && "grayscale(0.5)"};
  :hover {
    transform: translateY(-10px);
    box-shadow: ${(props) => !props?.soon && "0px 4px 4px rgba(0, 0, 0, 0)"};
  }
  .box-content {
    background-color: rgba(255, 255, 255, 0.85);
  }
  .box-img {
    position: relative;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    overflow: hidden;
    img {
      /* opacity: ${(props) => props.soon && 0.5}; */
      object-fit: cover;
    }
  }
  .box-content {
    position: relative;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    padding: 16px;
    background-color: ${AppTheme.color.white};
  }
`;
const BackLight = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  transform: scale(1.05);
  background-image: linear-gradient(263.88deg, #1deaa7 3.24%, #707bdf 100%);
`;
