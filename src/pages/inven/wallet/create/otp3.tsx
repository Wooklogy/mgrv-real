import { APIGetOTPQRcode } from "@/apis/auth/auth.api";
import CustomButton from "@/components/buttons/Button";
import CustomCol from "@/components/grids/Col.grid";
import CustomRow from "@/components/grids/Row.grid";
import CustomInput from "@/components/input/Input.comp";
import CustomCopySVG from "@/components/svg/Clipboard.svg";
import CustomText from "@/components/texts/Text";
import usePrincipal from "@/hooks/usePrincipal";
import { AccountSettingAnimationDiv } from "@/layouts/AccountSetting.layout";
import CreateWalletLayout from "@/layouts/CreateWallet.layout";
import { AppTheme } from "@/styles/global.style";

import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

const CreateWalletOTP3: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { refreshPrincipal } = usePrincipal();
  const [getToken, setGetToken] = React.useState<boolean>(false);
  const [qrcodeSrc, setQrcodeSrc] = React.useState<string>();
  const [secretKey, setSecretKey] = React.useState<string>();

  const qrcode = useQuery("getOTPQRcode", APIGetOTPQRcode, {
    enabled: !!getToken,
    onSuccess: (data) => {
      setQrcodeSrc(data && data?.data.QRcode);
      setSecretKey(data && data.data?.key);
    },
  });

  return (
    <CreateWalletLayout stemp1={false} stemp2={true}>
      <AccountSettingAnimationDiv>
        <CustomRow>
          <CustomCol span={24}>
            <CustomText size="xl" weight={"bold"}>
              {t("create.otp1")}
            </CustomText>
          </CustomCol>
          <CustomCol span={24} className="margin-top-05">
            <CustomText weight={"bold"} color={AppTheme.color.text_second}>
              {t("create.scan")}
            </CustomText>
          </CustomCol>
          <CustomCol span={24} className="margin-top-2">
            <CustomText weight={"bold"} color={AppTheme.color.text_second}>
              {t("create.enterkey")}
            </CustomText>
          </CustomCol>

          <CustomCol span={24}>
            <CustomText weight={"bold"} color={AppTheme.color.text_second}>
              {t("create.activate")}
            </CustomText>
          </CustomCol>

          <CustomRow className="margin-top-3">
            <CustomCol
              width={"12.5rem"}
              height={"12.5rem"}
              className="margin-right-05"
            >
              {getToken ? (
                <Image
                  src={(qrcodeSrc && qrcodeSrc) || ""}
                  fill
                  alt="otp_google"
                ></Image>
              ) : (
                <CustomButton
                  width={"100%"}
                  onClick={() => {
                    if (window.confirm(t("message.info.otp_regist") || "")) {
                      setGetToken(true);
                    }
                  }}
                >
                  <CustomText color={AppTheme.color.white} weight={"bold"}>
                    {t("button.regist.code")}
                  </CustomText>
                </CustomButton>
              )}
            </CustomCol>
          </CustomRow>
          <CustomRow className="margin-top-5">
            <CustomCol span={24}>
              <CustomText size="xxl" weight={"bold"}>
                {t("create.phrase")}
              </CustomText>
            </CustomCol>
            <CustomCol span={24}>
              <CustomText weight={"bold"} color={AppTheme.color.text_second}>
                {t("create.drive")}
              </CustomText>
            </CustomCol>
            <CustomCol span={24}>
              <CustomText weight={"bold"} color={AppTheme.color.text_second}>
                {t("create.safe")}
              </CustomText>
            </CustomCol>
            <CustomCol span={12} className="margin-top-1">
              <CustomInput
                disabled={true}
                suffix={<CustomCopySVG value={secretKey} />}
                value={secretKey}
              ></CustomInput>
            </CustomCol>
          </CustomRow>
        </CustomRow>
        <CustomRow className="margin-top-3 margin-bottom-5" justify={"center"}>
          <CustomButton
            onClick={() => {
              refreshPrincipal().then(() => {
                router.push("otp4");
              });
            }}
          >
            <CustomText color={AppTheme.color.white} weight={"bold"}>
              {t("create.back")}
            </CustomText>
          </CustomButton>
        </CustomRow>
      </AccountSettingAnimationDiv>
    </CreateWalletLayout>
  );
};
export default CreateWalletOTP3;
