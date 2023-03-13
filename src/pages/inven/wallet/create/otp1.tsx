import CustomBox from "@/components/boxs/Box.comp";
import CustomButton from "@/components/buttons/Button";
import CustomCol from "@/components/grids/Col.grid";
import CustomRow from "@/components/grids/Row.grid";
import CustomText from "@/components/texts/Text";
import { AccountSettingAnimationDiv } from "@/layouts/AccountSetting.layout";
import CreateWalletLayout from "@/layouts/CreateWallet.layout";
import { AppTheme } from "@/styles/global.style";

import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";

const CreateWalletOTP1: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const handleJump = () => {
    if (window.confirm(t("message.info.otp_unregist") || "")) {
      router.push("done");
    }
  };
  const handleOTP2 = () => {
    router.push("otp2");
  };
  return (
    <CreateWalletLayout stemp2={true}>
      <AccountSettingAnimationDiv>
        <CustomRow>
          <CustomCol span={24}>
            <CustomText size="xl" weight={"bold"}>
              {t("create.created")}
            </CustomText>
          </CustomCol>
          <CustomCol span={24} className="margin-top-05">
            <CustomText weight={"bold"} color={AppTheme.color.text_second}>
              {t("create.test")}
            </CustomText>
          </CustomCol>
          <CustomCol span={24} className="margin-top-05">
            <CustomText weight={"bold"} color={AppTheme.color.text_second}>
              {t("create.mwallet")}
            </CustomText>
          </CustomCol>
          <CustomCol span={24} className="margin-top-05">
            <CustomText weight={"bold"} color={AppTheme.color.text_second}>
              {t("create.explore")}
            </CustomText>
          </CustomCol>
          <CustomCol span={24} className="margin-top-5">
            <CustomText weight={"bold"} color={AppTheme.color.error}>
              {t("create.never")}
            </CustomText>
          </CustomCol>
          <CustomCol span={24} className="margin-top-05">
            <CustomText weight={"bold"} color={AppTheme.color.error}>
              {t("create.phishing")}
            </CustomText>
          </CustomCol>
          <CustomCol span={24} className="margin-top-05">
            <CustomText weight={"bold"} color={AppTheme.color.error}>
              {t("create.backup")}
            </CustomText>
          </CustomCol>
          <CustomCol span={24} className="margin-top-05">
            <CustomText weight={"bold"} color={AppTheme.color.error}>
              {t("create.contact")}
            </CustomText>
          </CustomCol>
          <CustomCol span={24} className="margin-top-3">
            <CustomBox
              border_color={AppTheme.color.primary}
              border_radius={12}
              height={"15rem"}
              className="flex-column align-center justify-center"
            >
              <CustomText weight={"bold"} size={"sm"}>
                {t("create.register")}
              </CustomText>
              <CustomText size={"sm"} weight={"bold"}>
                {t("create.go")}
              </CustomText>
            </CustomBox>
          </CustomCol>
        </CustomRow>
        <CustomRow className="margin-top-3 margin-bottom-5 gap-1">
          <CustomButton
            style_type="secondary"
            onClick={handleJump}
            size="large"
          >
            <CustomText weight={"bold"}>{t("create.skip")}</CustomText>
          </CustomButton>
          <CustomButton onClick={handleOTP2} size="large">
            <CustomText color={AppTheme.color.white} weight={"bold"}>
              {t("create.otp1")}
            </CustomText>
          </CustomButton>
        </CustomRow>
      </AccountSettingAnimationDiv>
    </CreateWalletLayout>
  );
};
export default CreateWalletOTP1;
