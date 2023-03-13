/* eslint-disable react-hooks/exhaustive-deps */
import {
  APISendEmailCode,
  APISendTempPwd,
  APIVerifyEmailCode,
} from "@/apis/auth/auth.api";
import CustomButton from "@/components/buttons/Button";
import CustomCol from "@/components/grids/Col.grid";
import CustomRow from "@/components/grids/Row.grid";
import CustomInput from "@/components/input/Input.comp";
import OTPInput from "@/components/input/OTP.input.comp";
import CustomText from "@/components/texts/Text";
import usePrincipal from "@/hooks/usePrincipal";
import ResponseLayout from "@/layouts/Response.layout";
import { recoilState_Resize } from "@/recoils/states.recoil";
import { AppTheme, ResoulutionReturner } from "@/styles/global.style";
import { routerPath } from "@/utils/router.util";

import { message } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";

const SecurityPassword: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { isSuccess, principal, refreshPrincipal } = usePrincipal();
  const [email, setEmail] = React.useState<string>();
  const [code, setCode] = React.useState<string>();
  const [codeVirfy, setVirfy] = React.useState<boolean>(false);
  const windowWidth = useRecoilValue(recoilState_Resize);
  const sendCode = useMutation(APISendEmailCode, {
    onError: (error: any) => {
      message.error(t("message.err.email_validate"));
    },
    onSuccess: (data) => {
      message.success(t("message.info.send_authkey"));
    },
  });
  const verifyCode = useMutation(APIVerifyEmailCode, {
    onError: (error: any) => {
      message.error(t(error?.response?.data?.message));
    },
    onSuccess: (data: any) => {
      setVirfy(data);
    },
  });
  const sendTempPwd = useMutation(APISendTempPwd, {
    onSuccess: (data) => {
      if (data) {
        message.success(t("message.scc.temp_password"));
        refreshPrincipal();
        router.push(routerPath.login);
      }
    },
  });
  React.useEffect(() => {
    if (isSuccess) {
      if (principal) {
        router.push(routerPath.root);
      }
    }
  }, [principal]);
  const handleChangeEmail:
    | React.ChangeEventHandler<HTMLInputElement>
    | undefined = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeCode = (val?: string) => {
    setCode(val);
  };

  const handleKeyDown = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.code === "Enter") {
      e.preventDefault();
      handleSummit();
    }
  };

  const handleOTPKeyDown = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.code === "Enter") {
      e.preventDefault();
      handleOtpSummit();
    }
  };
  const handleSummit = () => {
    if (window.confirm(`${t("message.info.send_authkey")}`)) {
      sendCode.mutate(email);
    }
  };
  const handleOtpSummit = () => {
    verifyCode.mutate({ code: code, email: email });
  };
  const sendTempPWD = () => {
    if (!codeVirfy) {
      message.warning(t("message.err.not_email_auth_key"));
    } else {
      sendTempPwd.mutate(email);
    }
  };
  return (
    <ResponseLayout
      loading={
        sendCode.isLoading || verifyCode.isLoading || sendTempPwd.isLoading
      }
    >
      <CustomRow>
        <CustomCol span={24} className="margin-top-5 flex justify-center">
          <CustomText size="xxxl" weight={"bold"}>
            {t("find.password")}
          </CustomText>
        </CustomCol>
      </CustomRow>
      <CustomRow justify={"center"} className="margin-top-4">
        <CustomCol
          span={ResoulutionReturner(windowWidth, 10, 23, 23, 23)}
          className="flex justify-start"
        >
          <CustomText size="lg" weight={"bold"}>
            {t("find.email")}
          </CustomText>
        </CustomCol>
      </CustomRow>
      <CustomRow gutter={[8, 0]} justify={"center"} className="margin-top-05">
        <CustomCol
          span={ResoulutionReturner(windowWidth, 8, 19, 19, 19)}
          className="flex justify-start"
        >
          <CustomInput
            value={email}
            disabled={codeVirfy}
            onKeyDown={handleKeyDown}
            onChange={handleChangeEmail}
            placeholder={t("find.eemail") || ""}
          ></CustomInput>
        </CustomCol>
        <CustomCol
          span={ResoulutionReturner(windowWidth, 2, 4, 4, 4)}
          className="flex justify-start"
        >
          <CustomButton onClick={handleSummit}>
            <CustomText color={AppTheme.color.white}>
              {t("create.confirm")}
            </CustomText>
          </CustomButton>
        </CustomCol>
      </CustomRow>
      {codeVirfy ? (
        <CustomRow justify={"center"} className="margin-top-2">
          <CustomCol span={8} className="flex-column justify-start align-start">
            <CustomText weight={"bold"} style_type="success" size="sm">
              ✅ {t("message.scc.auth")}
            </CustomText>
          </CustomCol>
        </CustomRow>
      ) : (
        <CustomRow justify={"center"} className="margin-top-2">
          <CustomCol
            span={ResoulutionReturner(windowWidth, 10, 23, 23, 23)}
            className="flex-column justify-start align-start"
          >
            <CustomRow>
              <CustomText size="lg" weight={"bold"}>
                {t("voca.auth_code")}
              </CustomText>
            </CustomRow>
            <CustomRow className="margin-top-05">
              <CustomText color={AppTheme.color.text_second}>
                {t("up.subtext")}
                <br /> {t("up.5min")}
              </CustomText>
            </CustomRow>
            <CustomRow className="margin-top-05">
              <OTPInput
                gap={"1rem"}
                onCustomChange={handleChangeCode}
                onCustomKeyDown={handleOTPKeyDown}
                maxcount={6}
                font_size={"1.2rem"}
                width={"20%"}
                height={ResoulutionReturner(
                  windowWidth,
                  "4.5rem",
                  "12vw",
                  "12vw",
                  "12vw"
                )}
              ></OTPInput>
            </CustomRow>
            <CustomRow className="margin-top-1 justify-end flex">
              <CustomCol span={6}>
                <CustomButton width={"100%"} onClick={handleOtpSummit}>
                  <CustomText color={AppTheme.color.white}>
                    {t("create.confirm")}
                  </CustomText>
                </CustomButton>
              </CustomCol>
            </CustomRow>
          </CustomCol>
        </CustomRow>
      )}

      <CustomRow justify={"center"} className="margin-top-3">
        <CustomCol span={8} className="flex justify-start">
          <CustomButton width={"100%"} onClick={sendTempPWD} height={"3rem"}>
            <CustomText weight={"bold"} color={AppTheme.color.white}>
              {t("button.regist.temp_password")}
            </CustomText>
          </CustomButton>
        </CustomCol>
      </CustomRow>
    </ResponseLayout>
  );
};
export default SecurityPassword;
