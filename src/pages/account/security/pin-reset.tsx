import { APIAccountModifyMgrvWallet } from "@/apis/account/account.api";
import { APIAuthLogin, APIVerifyOTPQRcode } from "@/apis/auth/auth.api";
import CustomInput from "@/components/input/Input.comp";
import OTPInput from "@/components/input/OTP.input.comp";
import { message, Spin } from "antd";
import React from "react";
import { useMutation } from "react-query";
import { ValidateCheckType } from "@/pages/auth/signup";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { recoilState_Resize } from "@/recoils/states.recoil";
import CustomRow from "@/components/grids/Row.grid";
import CustomCol from "@/components/grids/Col.grid";
import CustomText from "@/components/texts/Text";
import { AppTheme, ResoulutionReturner } from "@/styles/global.style";
import CustomButton from "@/components/buttons/Button";
import { RegexpWalletPasswordCheck } from "@/utils/regexp.util";
import AccountSettingLayout from "@/layouts/AccountSetting.layout";

interface ValuesProps {
  email?: string;
  password?: string;
  otp?: string;
}

const SecurityPagePinReset: React.FC = () => {
  const [current, setCurrent] = React.useState<boolean>(false);
  const windowWidth = useRecoilValue(recoilState_Resize);
  const { t } = useTranslation();

  const AuthComp = () => {
    const [value, setValue] = React.useState<ValuesProps>();
    const [otpAuth, setOtpAuth] = React.useState<boolean>(false);
    const verifyOTP = useMutation(APIVerifyOTPQRcode, {
      onError: () => {
        message.error(t("message.err.auth_code_validate"));
      },
      onSuccess: (data) => {
        setOtpAuth(data);
        if (!data) {
          message.error(t("message.err.auth_code_validate"));
        }
      },
    });
    const verifyAuth = useMutation(APIAuthLogin, {
      onError: (error: any) => {
        message.error(t(error.response.data.message));
      },
      onSuccess: () => {
        if (otpAuth) {
          setCurrent(true);
        } else {
          message.error(t("message.err.write_otp"));
        }
      },
    });

    const handleOTPChange = (val?: any) => {
      setValue((prev) => ({ ...prev, otp: val }));
    };
    const handleSummit = () => {
      verifyAuth.mutate({
        mm_identity: value?.email,
        mm_password: value?.password,
      });
    };
    return (
      <Spin spinning={verifyOTP.isLoading || verifyAuth.isLoading}>
        <CustomRow className="margin-top-2">
          <CustomCol span={24}>
            <CustomText size="lg" weight={"bold"}>
              {t("profile.botton.pin")}
            </CustomText>
          </CustomCol>
          <CustomCol span={24} className="margin-top-3">
            <CustomText size="lg" weight={"bold"}>
              {t("profile.pin.email")}
            </CustomText>
          </CustomCol>
          <CustomCol
            span={ResoulutionReturner(windowWidth, 12, 12, 20, 20)}
            className="margin-top-05"
          >
            <CustomInput
              value={value?.email}
              onChange={(e) => {
                setValue((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
              placeholder={t("profile.pin.eemail") || ""}
            ></CustomInput>
          </CustomCol>
          <CustomCol span={24} className="margin-top-3">
            <CustomText size="lg" weight={"bold"}>
              {t("profile.pin.pw")}
            </CustomText>
          </CustomCol>
          <CustomCol
            span={ResoulutionReturner(windowWidth, 12, 12, 20, 20)}
            className="margin-top-05"
          >
            <CustomInput
              value={value?.password}
              onChange={(e) => {
                setValue((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
              type="password"
              placeholder={t("profile.pin.epw") || ""}
            ></CustomInput>
          </CustomCol>
          {otpAuth ? (
            <>
              <CustomCol span={24} className="margin-top-3">
                <CustomText weight={"bold"} style_type="success" size="sm">
                  ✅ OTP {t("message.scc.auth")}
                </CustomText>
              </CustomCol>
            </>
          ) : (
            <>
              <CustomCol span={24} className="margin-top-3">
                <CustomText weight={"bold"} style_type="primary" size="xl">
                  {t("profile.pw.otp")}
                </CustomText>
              </CustomCol>
              <CustomCol span={24} className="margin-top-05">
                <CustomText weight={600} color={AppTheme.color.text_second}>
                  {t("profile.pw.otp1")}
                </CustomText>
              </CustomCol>
              <CustomCol
                span={ResoulutionReturner(windowWidth, 14, 14, 20, 20)}
                className="margin-top-2"
                height={"6rem"}
              >
                <OTPInput
                  maxcount={6}
                  width={"100%"}
                  gap={".5rem"}
                  font_size={"1.2rem"}
                  onCustomChange={handleOTPChange}
                  height={ResoulutionReturner(
                    windowWidth,
                    "4.5rem",
                    "4.5rem",
                    "12vw",
                    "12vw"
                  )}
                />
              </CustomCol>
              <CustomCol
                span={ResoulutionReturner(windowWidth, 14, 14, 20, 20)}
                className="margin-top-2 flex justify-end"
              >
                <CustomButton
                  size="large"
                  style_type="secondary"
                  onClick={() => {
                    verifyOTP.mutate(value?.otp);
                  }}
                >
                  <CustomText weight={"bold"}>
                    OTP {t("profile.button.otp")}
                  </CustomText>
                </CustomButton>
              </CustomCol>
            </>
          )}

          <CustomCol span={24} className="margin-top-3">
            <CustomButton onClick={handleSummit}>
              <CustomText color={AppTheme.color.white}>
                {t("create.confirm")}
              </CustomText>
            </CustomButton>
          </CustomCol>
        </CustomRow>
      </Spin>
    );
  };

  const ChangePinPassword = () => {
    const [password, setPassword] = React.useState<string>();
    const [confirm, setConfirm] = React.useState<string>();
    const [validate, setValidate] = React.useState<ValidateCheckType>();

    const modifyWalletPwd = useMutation(APIAccountModifyMgrvWallet, {
      onError: (error: any) => {
        message.error(error.response.data.message);
      },
      onSuccess: (data) => {
        message.success(t("message.scc.change_pin_password"));
        setCurrent(false);
      },
    });
    const handleKeyPress = (e: any) => {
      if (e.key == "Enter") {
        e.preventDefault();
        hanldeSummit();
      }
    };
    const hanldeSummit = () => {
      if (!validate?.validate_password) {
        message.error(t("message.err.pin_password_validate"));
        return;
      }
      if (!validate?.confirm_password) {
        message.error(t("in.epw.error"));
        return;
      }

      if (window.confirm(t("message.info.regist_pin") || "")) {
        modifyWalletPwd.mutate({ pin_password: password });
      }
    };
    const handlePasswordValidate = (e: any) => {
      const value: string = e?.target?.value;
      if (value === undefined) {
        setValidate((prev) => ({ ...prev, validate_password: false }));
        return;
      }
      if (value.length <= 6) {
        setPassword(value);
      }

      const validate_password = RegexpWalletPasswordCheck(value);
      const validate_confirm = value == confirm;
      setValidate((prev) => ({
        ...prev,
        confirm_password: validate_confirm,
      }));
      setValidate((prev) => ({
        ...prev,
        validate_password: validate_password,
      }));
    };
    //   비밀번호 확인
    const handlePasswordConfirm = (e: any) => {
      const value: string = e?.target?.value;
      if (value === undefined) {
        setValidate((prev) => ({ ...prev, confirm_password: false }));
        return;
      }
      setConfirm(value);
      const validate_password = value == password;
      setValidate((prev) => ({
        ...prev,
        confirm_password: validate_password,
      }));
    };
    return (
      <Spin spinning={modifyWalletPwd.isLoading}>
        <CustomCol span={24} className="margin-top-2">
          <CustomText size="lg" weight={"bold"}>
            {t("profile.pin.chang")}
          </CustomText>
        </CustomCol>
        <CustomCol span={24} className="margin-top-3">
          <CustomText size="lg" weight={"bold"}>
            {t("profile.pin.pw")}
          </CustomText>
        </CustomCol>
        <CustomCol span={12} className="margin-top-05">
          <CustomInput
            type="password"
            value={password}
            onKeyDown={handleKeyPress}
            maxLength={6}
            onChange={handlePasswordValidate}
            placeholder={t("profile.pin.epw") || ""}
          ></CustomInput>
        </CustomCol>
        {!validate?.validate_password && Number(password?.length) > 0 && (
          <CustomRow className="margin-top-05">
            <CustomCol span={8} className="flex justify-start">
              <CustomText color={AppTheme.color.error} size="ti">
                {t("message.err.validate_pin")}
              </CustomText>
            </CustomCol>
          </CustomRow>
        )}
        <CustomCol span={24} className="margin-top-1">
          <CustomText size="lg" weight={"bold"}>
            {t("profile.pin.cpw")}
          </CustomText>
        </CustomCol>
        <CustomCol span={12} className="margin-top-05">
          <CustomInput
            type="password"
            value={confirm}
            onKeyDown={handleKeyPress}
            maxLength={6}
            onChange={handlePasswordConfirm}
            placeholder={t("profile.pin.ecpw") || ""}
          ></CustomInput>
        </CustomCol>
        {!validate?.confirm_password && Number(confirm?.length) > 0 && (
          <CustomRow className="margin-top-05">
            <CustomCol span={8} className="flex justify-start">
              <CustomText color={AppTheme.color.error} size="ti">
                {t("profile.pin.error")}
              </CustomText>
            </CustomCol>
          </CustomRow>
        )}
        <CustomCol span={24} className="margin-top-3">
          <CustomButton onClick={hanldeSummit}>
            <CustomText color={AppTheme.color.white} weight={"bold"}>
              {t("profile.button.complete")}
            </CustomText>
          </CustomButton>
        </CustomCol>
      </Spin>
    );
  };

  return (
    <AccountSettingLayout>
      {current ? (
        <ChangePinPassword></ChangePinPassword>
      ) : (
        <AuthComp></AuthComp>
      )}
    </AccountSettingLayout>
  );
};
export default SecurityPagePinReset;
