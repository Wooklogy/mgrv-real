import CustomButton from "@/components/buttons/Button";
import CustomCol from "@/components/grids/Col.grid";
import CustomRow from "@/components/grids/Row.grid";
import CustomText from "@/components/texts/Text";
import { AccountSettingAnimationDiv } from "@/layouts/AccountSetting.layout";
import InventoryLayout from "@/layouts/Inventory.layout";
import { AppTheme } from "@/styles/global.style";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";

const InventoryWalletRecivePage: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <InventoryLayout>
      <AccountSettingAnimationDiv>
        <CustomRow className="margin-top-1">
          <CustomCol span={24}>
            <CustomText style_type="primary" size="xxxl" weight={"bold"}>
              {t("wallet.outsend")}
            </CustomText>
          </CustomCol>
          <CustomCol span={24} className="margin-top-05">
            <CustomText weight={600}>{t("wallet.out.subtext")}</CustomText>
          </CustomCol>
          <CustomCol span={24}>
            <CustomText weight={600} color={AppTheme.color.error}>
              {t("wallet.out.subtext2")}
            </CustomText>
          </CustomCol>
          <CustomCol span={24}>
            <CustomText weight={600}>{t("wallet.out.subtext3")}</CustomText>
          </CustomCol>
          <CustomCol span={24}>
            <CustomText weight={600}>{t("wallet.out.subtext4")}</CustomText>
          </CustomCol>
        </CustomRow>
        <CustomRow className="margin-top-2">
          <CustomCol span={24}>
            <CustomButton
              width={"10rem"}
              height={"3.0rem"}
              disabled={true}
              onClick={() => {
                router.push("send/external");
              }}
            >
              <CustomText
                color={AppTheme.color.white}
                weight={"bold"}
                size="sm"
              >
                {t("wallet.button.outsend")}
              </CustomText>
            </CustomButton>
          </CustomCol>
        </CustomRow>
        <CustomRow className="margin-top-5 ">
          <CustomCol span={24}>
            <CustomText style_type="primary" size="xxxl" weight={"bold"}>
              {t("wallet.insend")}
            </CustomText>
          </CustomCol>
          <CustomCol span={24} className="margin-top-05">
            <CustomText weight={600} color={AppTheme.color.error}>
              {t("wallet.in.subtext")}
            </CustomText>
          </CustomCol>
          <CustomCol span={24}>
            <CustomText weight={600}>{t("wallet.in.subtext2")}</CustomText>
          </CustomCol>
          <CustomCol span={24}>
            <CustomText weight={600}>{t("wallet.in.subtext3")}</CustomText>
          </CustomCol>
        </CustomRow>
        <CustomRow className="margin-top-2">
          <CustomCol span={24}>
            <CustomButton
              width={"10rem"}
              height={"3.0rem"}
              onClick={() => {
                router.push("send/mgrv");
              }}
            >
              <CustomText
                color={AppTheme.color.white}
                weight={"bold"}
                size="sm"
              >
                {t("wallet.button.insend")}
              </CustomText>
            </CustomButton>
          </CustomCol>
        </CustomRow>
      </AccountSettingAnimationDiv>
    </InventoryLayout>
  );
};
export default InventoryWalletRecivePage;
