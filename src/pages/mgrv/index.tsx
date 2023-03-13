import CustomButton from "@/components/buttons/Button";
import CustomCol from "@/components/grids/Col.grid";
import CustomRow from "@/components/grids/Row.grid";
import CustomText from "@/components/texts/Text";
import ResponseLayout from "@/layouts/Response.layout";
import { recoilState_Resize } from "@/recoils/states.recoil";
import { AppTheme, ResoulutionReturner } from "@/styles/global.style";
import { Divider, Image, message } from "antd";
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
          {t("mgrv.2way")}
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
              {t("mgrv.maintain")}
            </CustomText>
            <CustomRow className="margin-top-1">
              <CustomText weight={"medium"} color={AppTheme.color.text_second}>
                {t("mgrv.nodeoper")}
                <br />
                {t("mgrv.token")}
                <br />
                {t("mgrv.business")}
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
          {t("mgrv.exchange")}
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
          {t("mgrv.exchanges")}
        </CustomText>
      </CustomRow>
      <CustomRow className="margin-top-3">
        <Image
          preview={false}
          onClick={() => {
            message.info("COMMING SOON");
          }}
          className="cursor-pointer"
          src="/images/binance.png"
          alt="binance"
          width={"18.75rem"}
        ></Image>
      </CustomRow>
    </ResponseLayout>
  );
};
export default MainMgrvPage;
