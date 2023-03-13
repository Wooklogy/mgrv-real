import CustomButton from "@/components/buttons/Button";
import CustomCol from "@/components/grids/Col.grid";
import CustomRow from "@/components/grids/Row.grid";
import CustomText from "@/components/texts/Text";
import { AccountSettingAnimationDiv } from "@/layouts/AccountSetting.layout";
import CreateWalletLayout from "@/layouts/CreateWallet.layout";
import { AppTheme } from "@/styles/global.style";
import { t } from "i18next";

import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const CreateWalletOTP2: React.FC = () => {
  const router = useRouter();

  return (
    <CreateWalletLayout stemp1={false} stemp2={true}>
      <AccountSettingAnimationDiv>
        <CustomRow>
          <CustomCol span={24}>
            <CustomText size="xl" weight={"bold"}>
              {t("create.down")}
            </CustomText>
          </CustomCol>
          <CustomCol span={24} className="margin-top-05">
            <CustomText weight={"bold"} color={AppTheme.color.text_second}>
              {t("create.appstore")}
            </CustomText>
          </CustomCol>

          <CustomRow className="margin-top-3">
            <CustomCol
              width={"20.5rem"}
              height={"5.5rem"}
              className="margin-right-05"
            >
              <Image
                src="/images/otp_google.jpg"
                fill
                alt="otp_google"
                className="cursor-pointer"
                onClick={() => {
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=ko&gl=US",
                    "_blank"
                  );
                }}
              ></Image>
            </CustomCol>
            <CustomCol width={"20.5rem"} height={"5.5rem"}>
              <Image
                src="/images/otp_ios.jpg"
                fill
                alt="otp_ios"
                className="cursor-pointer"
                onClick={() => {
                  window.open(
                    "https://apps.apple.com/kr/app/google-authenticator/id388497605",
                    "_blank"
                  );
                }}
              ></Image>
            </CustomCol>
          </CustomRow>
        </CustomRow>
        <CustomRow className="margin-top-3 margin-bottom-5" justify={"center"}>
          <CustomButton
            onClick={() => {
              router.push("otp3");
            }}
          >
            <CustomText color={AppTheme.color.white} weight={"bold"}>
              {t("create.next")}
            </CustomText>
          </CustomButton>
        </CustomRow>
      </AccountSettingAnimationDiv>
    </CreateWalletLayout>
  );
};
export default CreateWalletOTP2;
