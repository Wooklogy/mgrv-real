/* eslint-disable react-hooks/exhaustive-deps */
import { APIGetOTPQRcode, APIVerifyOTPQRcode } from "@/apis/auth/auth.api";
import CustomButton from "@/components/buttons/Button";
import CustomCol from "@/components/grids/Col.grid";
import CustomRow from "@/components/grids/Row.grid";
import OTPInput from "@/components/input/OTP.input.comp";
import CustomText from "@/components/texts/Text";
import usePrincipal from "@/hooks/usePrincipal";
import { AccountSettingAnimationDiv } from "@/layouts/AccountSetting.layout";
import CreateWalletLayout from "@/layouts/CreateWallet.layout";
import { recoilState_Resize } from "@/recoils/states.recoil";
import { AppTheme, ResoulutionReturner } from "@/styles/global.style";
import { routerPath } from "@/utils/router.util";
import { message, Spin } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

const CreateWalletOTP4: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const windowWidth = useRecoilValue(recoilState_Resize);
  const { principal, isError } = usePrincipal();
  const [summitcode, setSummitCode] = React.useState<boolean>(false);
  const [QRcode, setQRcode] = React.useState<string>();

  useQuery(["verifyOTPcode", summitcode], () => APIVerifyOTPQRcode(QRcode), {
    onSuccess: (data) => {
      if (data) {
        router.push("done");
      } else {
        message.error(t("message.err.auth_otp_validate"));
      }
      setSummitCode(false);
    },
    enabled: !!summitcode,
  });
  React.useEffect(() => {
    if (principal && !principal?.otp_scret_key && !isError) {
      message.error(t("message.err.otp_unregisted"));
      router.push(routerPath.inven + "/wallet/create/otp3");
    }
  }, [principal]);

  return (
    <CreateWalletLayout stemp1={false} stemp2={true}>
      <AccountSettingAnimationDiv>
        <CustomRow>
          <CustomCol span={24}>
            <CustomText size="xl" weight={"bold"}>
              {t("create.otp1")}
            </CustomText>
          </CustomCol>

          <CustomCol span={24} className="margin-top-2">
            <CustomText weight={"bold"} color={AppTheme.color.text_second}>
              {t("create.verify")}
            </CustomText>
          </CustomCol>

          <CustomCol
            span={ResoulutionReturner(windowWidth, 12, 12, 24, 24)}
            className="margin-top-2"
          >
            <OTPInput
              maxcount={6}
              width={"100%"}
              gap={"1rem"}
              onCustomChange={(v) => {
                setQRcode(v);
              }}
              font_size={"1.2rem"}
              height={ResoulutionReturner(
                windowWidth,
                "4.5rem",
                "10vw",
                "10vw",
                "10vw"
              )}
            ></OTPInput>
          </CustomCol>
        </CustomRow>
        <CustomRow
          className="margin-top-3 margin-bottom-5 gap-1"
          justify={"start"}
        >
          <CustomButton
            style_type="secondary"
            onClick={() => {
              router.back();
            }}
          >
            <CustomText weight={"bold"}>{t("create.2back")}</CustomText>
          </CustomButton>
          <CustomButton
            onClick={() => {
              setSummitCode(!summitcode);
            }}
          >
            <CustomText color={AppTheme.color.white} weight={"bold"}>
              {t("create.3confirm")}
            </CustomText>
          </CustomButton>
        </CustomRow>
      </AccountSettingAnimationDiv>
    </CreateWalletLayout>
  );
};
export default CreateWalletOTP4;
