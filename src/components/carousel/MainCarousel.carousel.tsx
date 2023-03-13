/* eslint-disable react-hooks/exhaustive-deps */
import { ResponseFullLayoutCSS } from "@/layouts/Full.Layout";
import { recoilState_Resize } from "@/recoils/states.recoil";
import {
  AppResolution,
  AppTheme,
  ResoulutionReturner,
} from "@/styles/global.style";

import { translatePxValue } from "@/utils/style.util";
import Image from "next/image";
import React, { useRef } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import WoCol from "../grids/Col.grid";
import WoRow from "../grids/Row.grid";
import WoText from "../texts/Text";
import WoCarousel from "./Carousel";

export interface CustomMainCarouselItemProps {
  src: string;
  title?: string | React.ReactNode;
  sub_title?: string | React.ReactNode;
  content?: string | React.ReactNode;
  onClick?: () => void;
}

export interface WoMainCarouselProps {
  items?: CustomMainCarouselItemProps[];
  dot?: boolean;
  arrow?: "hover" | "static" | "disable";
  autoplay?: boolean;
  autoplay_time?: number;
  width?: string | number;
  height?: string | number;
}

const CustomMainCarousel: React.FC<WoMainCarouselProps> = (props) => {
  const dragRef = useRef<any>();
  const windowWidth = useRecoilValue(recoilState_Resize);
  const [visibleArrow, setVisibleArrow] = React.useState<boolean>(false);
  const [currentX, setCurrentX] = React.useState<number>(0);
  const frontRef = React.useRef<HTMLDivElement>(null);
  const backRef = React.useRef<HTMLDivElement>(null);

  const [prevTouchX, setPrevTouchX] = React.useState<number>(0);
  const [currentTouchX, setCurrentTouchX] = React.useState<number>(0);
  const [touch, setTouch] = React.useState<boolean>(false);

  React.useEffect(() => {
    const object = dragRef.current;
    object.addEventListener("touchstart", handleTouchStart);
    object.addEventListener("touchend", handleTouchEnd);
    return () => {
      object.removeEventListener("touchstart", handleTouchStart);
      object.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);
  React.useEffect(() => {
    if (touch) {
      const result = currentTouchX - prevTouchX;

      if (result > 100) {
        handleLeft();
      } else if (result < -100) {
        handleRight();
      }
      setTouch(false);
    }
  }, [touch]);

  const handleLeft = () => {
    const max = props.items?.length || 0;
    const rowCount = 1;
    if (currentX > 0) {
      setCurrentX(currentX - 1);
    } else {
      setCurrentX(max - rowCount);
    }
  };
  const handleRight = () => {
    const max = props.items?.length || 0;
    const rowCount = 1;
    if (currentX < max - rowCount) {
      setCurrentX(currentX + 1);
    } else {
      setCurrentX(0);
    }
  };
  const handleDot = (idx: number) => {
    setCurrentX(idx);
  };
  const handleTouchStart = (e: any) => {
    setPrevTouchX(e?.changedTouches[0]?.clientX);
    setTouch(false);
  };
  const handleTouchEnd = (e: any) => {
    setTouch(true);
    const currentX: number = Number(e.changedTouches[0].clientX);
    setCurrentTouchX(currentX);
  };
  return (
    <CustomMainCarouselStyle {...props} ref={dragRef}>
      <Back ref={backRef}>
        <WoCarousel
          height={"100%"}
          current_index={currentX}
          ratioX={16}
          ratioY={ResoulutionReturner(windowWidth, 9, 9, 16, 16)}
          row_count={1}
          elements={
            props?.items &&
            props?.items.map((item, idx) => {
              if (!item?.src) return;
              return (
                <BackItem key={`main-carousel-${idx}`}>
                  <Image
                    src={item.src}
                    priority={true}
                    alt={item.src}
                    style={{ width: "100%" }}
                    fill
                  ></Image>
                </BackItem>
              );
            })
          }
        ></WoCarousel>
        <span className="overlayer"></span>
      </Back>
      <Front
        ref={frontRef}
        onPointerEnter={() => {
          setVisibleArrow(true);
        }}
        onPointerLeave={() => {
          setVisibleArrow(false);
        }}
      >
        <WoCarousel
          height={"100%"}
          current_index={currentX}
          arrow_color={AppTheme.color.text}
          dot={true}
          on_arrow_left_click={handleLeft}
          on_arrow_right_click={handleRight}
          on_dot_click={handleDot}
          box_style={{ borderRadius: "12px" }}
          arrow={visibleArrow}
          arrow_pos={"-1.5rem"}
          arrow_size={"3rem"}
          ratioX={16}
          ratioY={ResoulutionReturner(windowWidth, 9, 9, 16, 16)}
          row_count={1}
          elements={
            props?.items &&
            props?.items.map((item, idx) => {
              return (
                <>
                  {item?.src && (
                    <>
                      <Image
                        key={`main-carousel-${idx}`}
                        src={item.src}
                        className={(currentX === idx && "focus") || ""}
                        priority={true}
                        alt={item.src}
                        style={{ width: "100%" }}
                        fill
                      ></Image>
                      <div className="overlay"></div>
                      <WoRow height={"100%"} align="bottom">
                        <WoCol offset={1} span={23} className="flex-column">
                          <WoRow className="margin-bottom-2">
                            <WoCol span={24}>
                              <WoText
                                size={ResoulutionReturner(
                                  windowWidth,
                                  "3.5rem",
                                  "3rem",
                                  "2rem",
                                  "2rem"
                                )}
                                color={AppTheme.color.white}
                                weight="bold"
                              >
                                {item.title || ""}
                              </WoText>
                            </WoCol>
                            <WoCol span={24}>
                              <WoText
                                size={ResoulutionReturner(
                                  windowWidth,
                                  "lg",
                                  "lg",
                                  "sm",
                                  "sm"
                                )}
                                color={AppTheme.color.white}
                                weight="bold"
                              >
                                {item.sub_title || ""}
                              </WoText>
                            </WoCol>
                            <WoCol span={24} className="margin-top-1">
                              {item.content || ""}
                            </WoCol>
                          </WoRow>
                        </WoCol>
                      </WoRow>
                    </>
                  )}
                </>
              );
            })
          }
        ></WoCarousel>
      </Front>
    </CustomMainCarouselStyle>
  );
};
export default CustomMainCarousel;

const CustomMainCarouselStyle = styled.div<WoMainCarouselProps>`
  position: relative;
  width: ${(props) => translatePxValue(props.width) || "100vw"};
  height: ${(props) => translatePxValue(props.height) || "40vw"};
  max-width: ${AppResolution[0]}px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  ${ResponseFullLayoutCSS}
`;

const Back = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
`;

const BackItem = styled.div`
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  width: initial;
  height: initial;
  background: none;
  opacity: 1;
  border: 0px;
  margin: 0px;
  padding: 0px;
  position: absolute;
  inset: 0px;
  ::after {
    backdrop-filter: blur(20px);
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.57) 0%,
      rgba(0, 0, 0, 0) 46.58%,
      #ffffff 91.26%,
      #ffffff 91.26%
    );
    pointer-events: none;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

const Front = styled.div`
  position: relative;
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 12px;
  box-shadow: 0px 8px 5px rgba(0, 0, 0, 0.25);

  :hover {
    img.focus {
      transform: scale(1.1);
    }
  }
  .dot {
    gap: 0.5rem;
    margin: 0.5rem 0;
    span {
      :hover {
        background-color: ${AppTheme.color.primary};
      }
      border-radius: 50%;
      z-index: 1;
      width: 1rem;
      height: 1rem;
      background-color: ${AppTheme.color.text_second};
    }
    .active {
      background-color: ${AppTheme.color.primary};
    }
  }

  img {
    transition: 1s;
    object-fit: cover;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.35);
  }
`;
