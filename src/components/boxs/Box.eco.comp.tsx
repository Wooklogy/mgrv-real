import { AppTheme } from "@/styles/global.style";
import { Col } from "antd";
import Image from "next/image";
import styled, { css } from "styled-components";
import CustomCol from "../grids/Col.grid";
import CustomRow from "../grids/Row.grid";
import CustomText from "../texts/Text";

import CustomBox, { CustomBoxProps } from "./Box.comp";

export interface CustomBoxGameProps extends CustomBoxProps {
  tier: "platinum" | "gold" | "silver" | "bronze";
}

const CustomBoxEco: React.FC<CustomBoxGameProps> = (props) => {
  return (
    <CustomBoxGameStyle {...props}>
      <CustomRow>
        <CustomCol span={14} className="flex-column justify-between">
          <CustomRow height={"auto"}>
            <Col span={24}>
              <CustomText
                color={AppTheme.color.white}
                weight={"bold"}
                size={"xl"}
              >
                MGROVE NFT
              </CustomText>
            </Col>
            <Col span={24}>
              <CustomText
                color={AppTheme.color.white}
                weight={"bold"}
                size={"xl"}
              >
                {props.tier.toLocaleUpperCase()}
              </CustomText>
            </Col>
          </CustomRow>
          <CustomRow height={"auto"}>
            <CustomText
              color={AppTheme.color.white}
              weight={"bold"}
              width={"100%"}
              size="sm"
            >
              PRICE
            </CustomText>
            <CustomText color={AppTheme.color.white} weight={"bold"} size="sm">
              {Number(3451).toLocaleString()} MGRV
            </CustomText>
          </CustomRow>
        </CustomCol>
        <CustomCol span={9} offset={1} className="flex align-center">
          <Image
            src={`/images/tiercard_${props.tier}_001.png`}
            alt={`${props.tier}-card-img`}
            width={342}
            height={560}
          ></Image>
        </CustomCol>
      </CustomRow>
    </CustomBoxGameStyle>
  );
};
export default CustomBoxEco;

const CustomBoxGameStyle = styled(CustomBox)<CustomBoxGameProps>`
  border-radius: 12px;
  padding: 2rem 1.5rem;
  cursor: pointer;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  ${(props) => {
    switch (props.tier) {
      case "platinum":
        return css`
          background: linear-gradient(140.76deg, #51beb8 3.1%, #a8a8a8 99.09%);
        `;
      case "gold":
        return css`
          background: linear-gradient(140.06deg, #ce9d63 0.89%, #a8a8a8 99.34%);
        `;
      case "silver":
        return css`
          background: linear-gradient(139.25deg, #78acc9 1.05%, #a8a8a8 99.3%);
        `;
      case "bronze":
        return css`
          background: linear-gradient(139.98deg, #937057 0%, #a8a8a8 99.25%);
        `;
    }
  }}
  transition: 250ms transform;

  img {
    width: 100%;
    height: auto;
    transition: 500ms 275ms ease-in-out;
  }
  :hover {
    transform: translateY(-10px);

    img {
      transform: perspective(150px) rotateY(-10deg);
    }
  }
`;
