import CustomButton from "@/components/buttons/Button";
import CustomCol from "@/components/grids/Col.grid";
import CustomRow from "@/components/grids/Row.grid";
import CustomProgress from "@/components/progress/Progress.comp";
import CustomText from "@/components/texts/Text";
import ResponseLayout from "@/layouts/Response.layout";
import { recoilState_Resize } from "@/recoils/states.recoil";
import {
  AppTheme,
  ResoulutionReturner,
  STYLE_GRADIANT_COLOR1,
  STYLE_GRADIANT_COLOR2,
} from "@/styles/global.style";

import { Divider, Image, message, Progress } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

const MainMgrvPage: React.FC = () => {
  const { t } = useTranslation();
  const windowWidth = useRecoilValue(recoilState_Resize);
  return (
    <ResponseLayout>
      <CustomRow className="margin-top-5">
        <CustomText size="xxl" weight={"bold"}>
          {`Founder’s Node`}
        </CustomText>
      </CustomRow>
      <Divider></Divider>
      <CustomRow gutter={[1, 0]} className="margin-top-3">
        <CustomCol
          span={ResoulutionReturner(windowWidth, 5, 5, 24, 24)}
          className={ResoulutionReturner(
            windowWidth,
            "",
            "",
            "flex justify-center",
            "flex justify-center"
          )}
        >
          <Image
            src="/images/sampleNode.png"
            alt={"sampleNode"}
            preview={false}
            width={ResoulutionReturner(
              windowWidth,
              "20rem",
              "15rem",
              "20rem",
              "15rem"
            )}
          ></Image>
        </CustomCol>
        <CustomCol
          span={ResoulutionReturner(windowWidth, 17, 17, 22, 22)}
          offset={ResoulutionReturner(windowWidth, 2, 2, 1, 1)}
          className={`flex-column justify-around ${ResoulutionReturner(
            windowWidth,
            "",
            "",
            "align-center",
            "align-center"
          )}`}
        >
          <CustomRow>
            <CustomText size="lg" weight={"bold"}>
              {t("node.puchase.rewoerd")}
            </CustomText>
            <CustomRow className="margin-top-1">
              <CustomText weight={"medium"} color={AppTheme.color.text_second}>
                {t("node.oper1")}
                <br />
                {t("node.oper2")}
                <br />
                {t("node.oper3")}
                <br />
                {t("node.oper4")}
              </CustomText>
            </CustomRow>
          </CustomRow>
          <CustomRow
            className={ResoulutionReturner(
              windowWidth,
              "margin-top-1",
              "margin-top-1",
              "margin-top-3",
              "margin-top-3"
            )}
            justify={ResoulutionReturner(
              windowWidth,
              "start",
              "start",
              "center",
              "center"
            )}
          >
            <CustomButton
              size={ResoulutionReturner(
                windowWidth,
                undefined,
                undefined,
                "large",
                "large"
              )}
            >
              <CustomText weight={"bold"} color={AppTheme.color.white}>
                {t("mgrv.puchase")}
              </CustomText>
            </CustomButton>
          </CustomRow>
        </CustomCol>
      </CustomRow>
      <CustomRow
        className={`margin-top-5 ${ResoulutionReturner(
          windowWidth,
          "",
          "",
          "margin-left-1",
          "margin-left-1"
        )}`}
      >
        <CustomText size="lg" weight={"bold"}>
          {t("node.round")}
        </CustomText>
      </CustomRow>
      <CustomRow
        className={`margin-top-05 ${ResoulutionReturner(
          windowWidth,
          "",
          "",
          "margin-left-1",
          "margin-left-1"
        )}`}
      >
        <CustomText color={AppTheme.color.text_second} weight={"medium"}>
          {t("node.sale")}
        </CustomText>
      </CustomRow>
      <CustomRow className="margin-top-5 margin-bottom-5 flex justify-center gap-5">
        <CustomProgress
          type="circle"
          percent={75}
          _width={"15rem"}
          strokeColor={{
            "0%": STYLE_GRADIANT_COLOR1,
            "100%": STYLE_GRADIANT_COLOR2,
          }}
        >
          <CustomRow className="justify-center">
            <CustomText> {t("sale.node")}</CustomText>
          </CustomRow>
          <CustomRow className="justify-center">
            <CustomText size="xxl" weight={"bold"}>
              {850}
            </CustomText>
          </CustomRow>
          <CustomRow className="justify-center">
            <CustomText> {`Founder's Node`}</CustomText>
          </CustomRow>
        </CustomProgress>
        <CustomProgress
          type="circle"
          percent={75}
          _width={"15rem"}
          strokeColor={{
            "0%": STYLE_GRADIANT_COLOR1,
            "100%": STYLE_GRADIANT_COLOR2,
          }}
        >
          <CustomRow className="justify-center">
            <CustomText> {t("last.node")}</CustomText>
          </CustomRow>
          <CustomRow className="justify-center">
            <CustomText
              width={"100%"}
              text_overflow={true}
              class_name="flex justify-center"
              size="xxl"
              weight={"bold"}
            >
              {"$ 0"}
            </CustomText>
          </CustomRow>
          <CustomRow className="justify-center">
            <CustomText> {t("price.node")}</CustomText>
          </CustomRow>
        </CustomProgress>
        <CustomProgress
          type="circle"
          percent={75}
          _width={"15rem"}
          strokeColor={{
            "0%": STYLE_GRADIANT_COLOR1,
            "100%": STYLE_GRADIANT_COLOR2,
          }}
        >
          <CustomRow className="justify-center">
            <CustomText> {t("sale.quantity.node")}</CustomText>
          </CustomRow>
          <CustomRow className="justify-center">
            <CustomText size="xxl" weight={"bold"}>
              {"50"}
            </CustomText>
          </CustomRow>
          <CustomRow className="justify-center">
            <CustomText> {t("quantity.node")}</CustomText>
          </CustomRow>
        </CustomProgress>
      </CustomRow>
    </ResponseLayout>
  );
};
export default MainMgrvPage;
