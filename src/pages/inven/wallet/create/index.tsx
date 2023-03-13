/* eslint-disable react-hooks/exhaustive-deps */
import { APIAccountModifyMgrvWallet } from "@/apis/account/account.api";
import CustomButton from "@/components/buttons/Button";
import CustomCol from "@/components/grids/Col.grid";
import CustomRow from "@/components/grids/Row.grid";
import CustomInput from "@/components/input/Input.comp";
import CustomText from "@/components/texts/Text";
import usePrincipal from "@/hooks/usePrincipal";
import { AccountSettingAnimationDiv } from "@/layouts/AccountSetting.layout";
import CreateWalletLayout from "@/layouts/CreateWallet.layout";
import { ValidateCheckType } from "@/pages/auth/signup";
import { AppTheme } from "@/styles/global.style";
import { RegexpWalletPasswordCheck } from "@/utils/regexp.util";
import { message, Spin } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
interface PasswordChangeProps {
  password?: string;
  password_confirm?: string;
}
const CreateWalletPage1 = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { principal, isError } = usePrincipal();
  const [values, setValues] = React.useState<PasswordChangeProps>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [validate, setValidate] = React.useState<ValidateCheckType>();
  const modifyWalletPassword = useMutation(APIAccountModifyMgrvWallet, {
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: (error: any) => {
      message.error(t(error.response.data.message));
    },
    onSuccess: () => {
      if (!principal?.otp_scret_key) router.push("create/otp1");
      else {
        router.back();
      }
    },
  });

  React.useEffect(() => {
    if (principal?.mgrv_wallet_address && !isError) {
      router.back();
    }
  }, [principal?.mgrv_wallet_address]);

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
      message.error(t("message.err.password_confirm_validate"));
      return;
    }

    if (window.confirm(t("message.info.regist_pin") || "")) {
      modifyWalletPassword.mutate({ pin_password: values?.password });
    }
  };
  //   비밀번호 확인

  const handlePasswordValidate = (e: any) => {
    const value: string = e?.target?.value;
    if (value === undefined) {
      setValidate((prev) => ({ ...prev, validate_password: false }));
      return;
    }
    if (value.length <= 6) {
      setValues((prev) => ({ ...prev, password: value }));
    }

    const validate_password = RegexpWalletPasswordCheck(value);
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
    setValues((prev) => ({ ...prev, password_confirm: value }));
    const validate_password = value == values?.password;
    setValidate((prev) => ({
      ...prev,
      confirm_password: validate_password,
    }));
  };

  return (
    <CreateWalletLayout stemp1={true}>
      <AccountSettingAnimationDiv>
        <Spin spinning={loading}>
          <CustomRow>
            <CustomCol span={24}>
              <CustomText size="xl" weight={"bold"}>
                {t("create.start")}
              </CustomText>
            </CustomCol>
            <CustomCol span={24} className="margin-top-05">
              <CustomText weight={"bold"} color={AppTheme.color.text_second}>
                {t("create.mwallet")}
              </CustomText>
            </CustomCol>
            <CustomCol span={24}>
              <CustomText weight={"bold"} color={AppTheme.color.text_second}>
                {t("create.explore")}
              </CustomText>
            </CustomCol>
            <CustomCol span={24} className="margin-top-5">
              <CustomText size="xl" weight={"bold"}>
                {t("create.set")}
              </CustomText>
            </CustomCol>
            <CustomCol span={24} className="margin-top-05">
              <CustomText weight={"bold"} color={AppTheme.color.text_second}>
                {t("create.different")}
              </CustomText>
            </CustomCol>
            <CustomCol span={24}>
              <CustomText weight={"bold"} color={AppTheme.color.text_second}>
                {t("create.different1")}
              </CustomText>
            </CustomCol>
            <CustomCol span={24}>
              <CustomText weight={"bold"} color={AppTheme.color.text_second}>
                {t("create.different2")}
              </CustomText>
            </CustomCol>
            <CustomCol span={24} className="margin-top-5">
              <CustomText size="xl" weight={"bold"}>
                {t("create.pw")}
              </CustomText>
            </CustomCol>
            <CustomCol span={12} className="margin-top-1">
              <CustomInput
                placeholder={t("create.pw1") || ""}
                type="password"
                maxLength={6}
                onKeyDown={handleKeyPress}
                onChange={handlePasswordValidate}
              ></CustomInput>
            </CustomCol>
            {!validate?.validate_password &&
              Number(values?.password?.length) > 0 && (
                <CustomRow className="margin-top-05">
                  <CustomCol span={8} className="flex justify-start">
                    <CustomText color={AppTheme.color.error} size="ti">
                      {t("message.err.validate_pin")}
                    </CustomText>
                  </CustomCol>
                </CustomRow>
              )}
            <CustomCol span={24} className="margin-top-3">
              <CustomText size="xl" weight={"bold"}>
                {t("create.cpw")}
              </CustomText>
            </CustomCol>
            <CustomCol span={12} className="margin-top-1">
              <CustomInput
                placeholder={t("create.cpw1") || ""}
                maxLength={6}
                type="password"
                onKeyDown={handleKeyPress}
                onChange={handlePasswordConfirm}
              ></CustomInput>
            </CustomCol>
            {!validate?.confirm_password &&
              Number(values?.password_confirm?.length) > 0 && (
                <CustomRow className="margin-top-05">
                  <CustomCol span={8} className="flex justify-start">
                    <CustomText color={AppTheme.color.error} size="ti">
                      {t("create.erroe")}
                    </CustomText>
                  </CustomCol>
                </CustomRow>
              )}
          </CustomRow>
          <CustomRow className="margin-top-3 margin-bottom-5 gap-1">
            <CustomButton
              style_type="secondary"
              onClick={() => {
                router.back();
              }}
            >
              <CustomText weight={"bold"}>{t("create.back")}</CustomText>
            </CustomButton>
            <CustomButton onClick={hanldeSummit}>
              <CustomText color={AppTheme.color.white} weight={"bold"}>
                {t("create.confirm")}
              </CustomText>
            </CustomButton>
          </CustomRow>
        </Spin>
      </AccountSettingAnimationDiv>
    </CreateWalletLayout>
  );
};
export default CreateWalletPage1;
