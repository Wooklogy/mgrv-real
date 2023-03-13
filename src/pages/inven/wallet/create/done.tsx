/* eslint-disable react-hooks/exhaustive-deps */
import CustomButton from "@/components/buttons/Button";
import CustomCol from "@/components/grids/Col.grid";
import CustomRow from "@/components/grids/Row.grid";
import CustomText from "@/components/texts/Text";
import usePrincipal from "@/hooks/usePrincipal";
import { AccountSettingAnimationDiv } from "@/layouts/AccountSetting.layout";
import CreateWalletLayout from "@/layouts/CreateWallet.layout";
import { AppTheme } from "@/styles/global.style";
import { routerPath } from "@/utils/router.util";
import { message } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";

const CreateWalletDone = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { principal, isError } = usePrincipal();
  React.useEffect(() => {
    if (principal && !principal?.otp_scret_key && !isError) {
      message.error(t("message.err.otp_unregisted"));
      router.push(routerPath.inven + "/wallet/create/otp3");
    }
  }, [principal]);
  return (
    <CreateWalletLayout stemp1={true} stemp2={true}>
      <AccountSettingAnimationDiv>
        <CustomRow>
          <CustomCol span={24}>
            <CustomText size="xl" weight={"bold"}>
              {t("create.congratulations")}
            </CustomText>
          </CustomCol>
          <CustomCol span={24} className="margin-top-05">
            <CustomText color={AppTheme.color.text_second} weight={"bold"}>
              {t("create.completed")}
            </CustomText>
          </CustomCol>
          <CustomCol span={24} className="margin-top-05">
            <CustomText color={AppTheme.color.text_second} weight={"bold"}>
              {t("create.adventures")}
            </CustomText>
          </CustomCol>
        </CustomRow>
        <CustomRow className="margin-top-3 margin-bottom-5 gap-1">
          <CustomButton
            onClick={() => {
              router.push(routerPath.root);
            }}
          >
            <CustomText color={AppTheme.color.white} weight={"bold"}>
              {t("create.complete")}
            </CustomText>
          </CustomButton>
        </CustomRow>
      </AccountSettingAnimationDiv>
    </CreateWalletLayout>
  );
};
export default CreateWalletDone;
