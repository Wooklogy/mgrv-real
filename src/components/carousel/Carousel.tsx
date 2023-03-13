/* eslint-disable react-hooks/exhaustive-deps */
import React, { PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { randomUUID } from "crypto";
import { useRecoilValue } from "recoil";
import { recoilState_Resize } from "@/recoils/states.recoil";
import { translatePxValue } from "@/utils/style.util";
import { AppTheme } from "@/styles/global.style";
import WoRow from "../grids/Row.grid";
const DEFAULT_GAP = 0;
const DEFAULT_VIEW_COUNT = 4;
const DEFAULT_RATIO_X = 16;
const DEFAULT_RATIO_Y = 9;

export interface CustomCarouselProps
  extends Pick<
    React.HTMLAttributes<HTMLDivElement>,
    "onClick" | "style" | "onPointerEnter"
  > {
  arrow?: boolean;
  arrow_size?: number | string;
  box_style?: React.CSSProperties;
  arrow_color?: string;
  arrow_pos?: number | string;
  current_index?: number;
  touch_mode?: boolean;
  dot?: boolean;
  width?: number | string;
  height?: number | string;
  min_width?: number | string;
  min_height?: number | string;
  // 자동재생관련
  autoplay?: boolean;
  autoplay_time?: number;
  // 요소 클릭 오버라이딩
  on_arrow_left_click?: () => void;
  on_arrow_right_click?: () => void;
  on_dot_click?: (idx: number) => void;
  // rem
  // 한줄에 보여줄 갯수
  row_count?: number;
  gap?: number;
  ratioX?: number;
  ratioY?: number;
  wrap?: boolean;
  elements?: React.ReactNode[] | React.ReactElement[];
  spare?: number;
  overflow?: "hidden" | "visible";
  is_overflow?: boolean;
}

const CustomCarousel: React.FC<PropsWithChildren<CustomCarouselProps>> = (
  props
) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const ulRef = React.useRef<HTMLUListElement>(null);

  const resize = useRecoilValue(recoilState_Resize);
  const [prevTouchX, setPrevTouchX] = React.useState<number>(0);
  const [currentTouchX, setCurrentTouchX] = React.useState<number>(0);
  const [touch, setTouch] = React.useState<boolean>(false);
  const [currentX, setCurrentX] = React.useState<number>(0);
  const [sizePerRatio, setSizePerRatio] = React.useState<{
    width: number;
    height: number;
  }>();
  const [sizePerWidth, setSizePerWidth] = React.useState<number>(0);

  const handleTouchStart = (e: any) => {
    setPrevTouchX(e?.changedTouches[0]?.clientX);
    setTouch(false);
  };
  const handleTouchEnd = (e: any) => {
    setTouch(true);
    const currentX: number = Number(e.changedTouches[0].clientX);
    setCurrentTouchX(currentX);
  };
  React.useEffect(() => {
    if (props.touch_mode && divRef.current && !props.wrap) {
      const object = divRef.current;
      object.addEventListener("touchstart", handleTouchStart);
      object.addEventListener("touchend", handleTouchEnd);
      return () => {
        object.removeEventListener("touchstart", handleTouchStart);
        object.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [props.touch_mode, props.wrap]);
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
  //todo autoplay
  React.useEffect(() => {
    setCurrentX(props.current_index || 0);
  }, [props.current_index]);

  React.useEffect(() => {
    const spare = props?.spare || 0;
    const container_width = divRef.current?.clientWidth || 0;

    const gaps = props?.gap
      ? props.gap * (props.row_count || DEFAULT_VIEW_COUNT) - 1
      : DEFAULT_GAP * (props.row_count || DEFAULT_VIEW_COUNT) - 1;

    const realWidth = container_width - gaps - spare;

    const widthPerOne = realWidth / (props.row_count || DEFAULT_VIEW_COUNT);
    const heightPerOne =
      (widthPerOne / (props.ratioX || DEFAULT_RATIO_X)) *
      (props.ratioY || DEFAULT_RATIO_Y);

    setSizePerRatio({
      width: Math.ceil(widthPerOne - Number(props.wrap ? 1 : 0)),
      height: heightPerOne,
    });
    const elementWidth =
      widthPerOne + (props.gap || DEFAULT_GAP) - Number(props.wrap ? 1 : 0);
    setSizePerWidth(elementWidth);
  }, [
    props.row_count,
    props.ratioX,
    props.ratioY,
    props.gap,
    props.wrap,
    props.spare,
    resize,
    divRef.current?.clientWidth,
    ulRef.current?.clientWidth,
    props.overflow,
    props.elements,
  ]);
  const handleRight = () => {
    if ((props.row_count || 0) >= (props.elements?.length || 0)) {
      return;
    }
    const row_count = props.row_count || 0;
    const max = props.elements?.length || 0;
    if (currentX < max - row_count) {
      setCurrentX(currentX + 1);
    } else {
      setCurrentX(0);
    }
  };
  const handleLeft = () => {
    if (currentX > 0) {
      setCurrentX(currentX - 1);
    } else {
      if (!props.elements?.length && !props?.row_count) return;
      const row_count = props.row_count || 0;
      const max = props.elements?.length || 0;

      setCurrentX(max - row_count || 0);
    }
  };
  return (
    <CustomCarouselStyle
      {...props}
      width={
        (props.width && translatePxValue(props.width)) || sizePerRatio?.width
      }
      height={
        (props.height && translatePxValue(props.height)) || sizePerRatio?.height
      }
      ref={divRef}
    >
      <AnimatePresence>
        {props.arrow && (
          <motion.span
            key="left-arrow"
            className={"custom-carowsel-arrow"}
            transition={{ duration: 0.25 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BiChevronLeft
              style={{ width: "inherit", height: "inherit" }}
              onClick={() => {
                if (!props?.on_arrow_left_click) handleLeft();
                else props.on_arrow_left_click();
              }}
              color={props.arrow_color || AppTheme.color.primary}
            />
          </motion.span>
        )}
      </AnimatePresence>
      <div className="content-container" style={props.box_style}>
        <ul
          ref={ulRef}
          style={{
            transform: `translateX(${-sizePerWidth * currentX}px)`,
          }}
        >
          {props?.elements?.map((item, idx) => {
            const uuid = `${randomUUID}${idx}`;
            return <ol key={uuid}>{item}</ol>;
          })}
        </ul>
        {props.dot && (
          <WoRow className="dot justify-center">
            {props.elements?.map((_item, idx) => {
              return (
                <span
                  key={`main-carousel-dot-${idx}`}
                  className={(currentX === idx && "active") || ""}
                  onClick={() => {
                    if (!props.on_dot_click) setCurrentX(idx);
                    else {
                      props.on_dot_click(idx);
                    }
                  }}
                ></span>
              );
            })}
          </WoRow>
        )}
      </div>
      <AnimatePresence>
        {props.arrow && (
          <motion.span
            key="right-arrow"
            className={"custom-carowsel-arrow"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            exit={{ opacity: 0 }}
          >
            <BiChevronRight
              style={{ width: "inherit", height: "inherit" }}
              onClick={() => {
                if (!props?.on_arrow_right_click) handleRight();
                else props.on_arrow_right_click();
              }}
              color={props.arrow_color || AppTheme.color.primary}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </CustomCarouselStyle>
  );
};

export default CustomCarousel;

const CustomCarouselStyle = styled.div<CustomCarouselProps>`
  width: 100%;
  height: ${(props) => translatePxValue(props.height)};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .custom-carowsel-arrow {
    cursor: pointer;
    ${(props) =>
      props.overflow !== "hidden" &&
      css`
        position: absolute;
        background-color: ${AppTheme.color.white};
        border-radius: 50%;
        width: ${translatePxValue(props.arrow_size || "1rem")};
        height: ${translatePxValue(props.arrow_size || "1rem")};
        .svg {
          width: inherit;
          height: inherit;
        }
        transition: transform 250ms;
        :active {
          transform: scale(0.85);
        }
        top: 50%;
        z-index: 2;
        &:first-of-type {
          left: ${translatePxValue(props.arrow_pos || 0)};
        }
        &:last-of-type {
          right: ${translatePxValue(props.arrow_pos || 0)};
        }
      `}
  }
  .content-container {
    list-style: none;
    width: 100%;
    height: ${(props) => translatePxValue(props.height)};
    overflow-x: ${(props) => (!props.is_overflow ? "clip" : "visible")};
    flex: ${(props) =>
      props?.arrow && props.overflow == "hidden" ? `0 0 90%` : `0 0 100%`};
    ul {
      display: flex;
      padding: 0;
      transition: 250ms;
      transition-timing-function: spring(1 100 10 10);
      margin: 0;
      height: 100%;
      & > ol {
        ::marker {
          display: none;
        }
        position: relative;
        padding: 0;
        margin-left: ${(props) => (props.gap || DEFAULT_GAP) / 2}px;
        margin-right: ${(props) => (props.gap || DEFAULT_GAP) / 2}px;
        width: ${(props) => translatePxValue(props.width)};
        min-width: ${(props) => translatePxValue(props.width)};
      }
    }

    ${(props) =>
      props.wrap &&
      css`
        overflow: initial;
        ul {
          display: flex;
          flex-wrap: wrap;
        }
        ol {
          min-height: ${translatePxValue(props.height)};
          height: ${translatePxValue(props.height)};
          margin-bottom: ${props.gap || DEFAULT_GAP}px;
        }
      `}
    .dot {
      gap: 0.5rem;
      margin: 0.5rem 0;
      display: flex;
      position: absolute;
      bottom: 0;
      span {
        :hover {
          background-color: ${AppTheme.color.primary};
        }
        display: block;
        border-radius: 50%;
        z-index: 20;
        width: 1rem;
        height: 1rem;
        background-color: ${AppTheme.color.text_second};
      }
      .active {
        background-color: ${AppTheme.color.primary};
      }
    }
  }
  .ant-image {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 6px;
    img {
      width: 100%;
    }
  }
`;
