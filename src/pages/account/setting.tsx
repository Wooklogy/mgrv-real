import { APIAccountModifyPassword } from "@/apis/account/account.api";
import { APIAuthLoginType } from "@/apis/auth/auth.api.d";
import { APIAuthLogin } from "@/apis/auth/auth.api";

import CustomInput from "@/components/input/Input.comp";
import usePrincipal, { UserProps } from "@/hooks/usePrincipal";

import { message, Spin } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useMutation } from "react-query";
import { ValidateCheckType } from "../auth/signup";
import { useTranslation } from "react-i18next";
import AccountSettingLayout, {
  AccountSettingAnimationDiv,
} from "@/layouts/AccountSetting.layout";
import CustomRow from "@/components/grids/Row.grid";
import CustomCol from "@/components/grids/Col.grid";
import CustomText from "@/components/texts/Text";
import { AppTheme } from "@/styles/global.style";
import CustomButton from "@/components/buttons/Button";
import { RegexpPasswordCheck } from "@/utils/regexp.util";

const PAGES = {
  password: "password",
  default: "default",
};
const AccountSettingPage: React.FC = () => {
  const [current, setCurrent] = React.useState<string>();
  const CurrentComponent: any = () => {
    switch (current) {
      case PAGES.password:
        return (
          <PasswordChangeComp setCurrent={setCurrent}></PasswordChangeComp>
        );
      default:
        return <StandardComponent setCurrent={setCurrent}></StandardComponent>;
    }
  };
  return (
    <AccountSettingLayout>
      <AnimatePresence>
        <CurrentComponent></CurrentComponent>
      </AnimatePresence>
    </AccountSettingLayout>
  );
};

export default AccountSettingPage;

const StandardComponent: React.FC<{ setCurrent: any }> = ({ setCurrent }) => {
  const { principal } = usePrincipal();
  const { t } = useTranslation();
  const [values, setValues] = React.useState<APIAuthLoginType>();
  const [loading, isLoading] = React.useState<boolean>(false);
  const loginResponse = useMutation(APIAuthLogin, {
    onMutate: () => {
      isLoading(true);
    },
    onSettled: () => {
      isLoading(false);
    },
    onError(error: any) {
      message.error(t(error.response.data.message));
    },
  });

  const handlePasswordChange = async () => {
    const res = await loginResponse.mutateAsync(values);
    if (res) {
      setCurrent("password");
    }
  };
  return (
    <>
      <AccountSettingAnimationDiv>
        <Spin spinning={loading}>
          <CustomRow className="margin-top-2">
            <CustomCol span={24}>
              <CustomText weight={"bold"} size="lg">
                {t("profile.hello", { string: principal?.mm_nickname })}
              </CustomText>
            </CustomCol>
            <CustomCol span={24} className="margin-top-05">
              <CustomText color={AppTheme.color.text_second}>
                {t("profile.check")}
              </CustomText>
            </CustomCol>
          </CustomRow>
          <CustomRow className="margin-top-2">
            <CustomCol span={24}>
              <CustomText weight={"bold"} size="sm">
                {t("profile.email")}
              </CustomText>
            </CustomCol>
            <CustomCol span={12} className="margin-top-05">
              <CustomInput
                placeholder={t("profile.email1") || ""}
                onChange={(e) => {
                  setValues((prev) => ({
                    ...prev,
                    mm_identity: e.target.value,
                  }));
                }}
              ></CustomInput>
            </CustomCol>
          </CustomRow>
          <CustomRow className="margin-top-2">
            <CustomCol span={24}>
              <CustomText weight={"bold"} size="sm">
                {t("profile.pw")}
              </CustomText>
            </CustomCol>
            <CustomCol span={12} className="margin-top-05">
              <CustomInput
                placeholder={t("profile.pw1") || ""}
                type="password"
                onChange={(e) => {
                  setValues((prev) => ({
                    ...prev,
                    mm_password: e.target.value,
                  }));
                }}
              ></CustomInput>
            </CustomCol>
          </CustomRow>
          <CustomRow className="margin-top-2">
            <CustomButton
              width={"15rem"}
              onClick={handlePasswordChange}
              height={"3rem"}
            >
              <CustomText color={AppTheme.color.white} weight="bold">
                {t("profile.button.pw")}
              </CustomText>
            </CustomButton>
          </CustomRow>
        </Spin>
      </AccountSettingAnimationDiv>
    </>
  );
};

interface PasswordChangeProps {
  mm_password?: string;
  password_confirm?: string;
}
const PasswordChangeComp: React.FC<{ setCurrent: any }> = ({ setCurrent }) => {
  const { t } = useTranslation();
  const [values, setValues] = React.useState<PasswordChangeProps>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [validate, setValidate] = React.useState<ValidateCheckType>();
  const modifyPassword = useMutation(APIAccountModifyPassword, {
    onMutate: (data) => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: (error: any) => {
      message.error(error.response.data.message);
    },
    onSuccess: () => {
      message.success(t("message.scc.change_password"));
      setCurrent(PAGES.default);
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
      message.error(t("message.err.password_validate"));
      return;
    }
    if (!validate?.confirm_password) {
      message.error(t("message.err.password_confirm_validate"));
      return;
    }

    if (window.confirm(t("message.confirm.change_password") || "")) {
      modifyPassword.mutate(values?.mm_password);
    }
  };
  //   비밀번호 유효성 검사
  const handlePasswordValidate = (e: any) => {
    const value: string = e?.target?.value;
    if (value === undefined) {
      setValidate((prev) => ({ ...prev, validate_password: false }));
      return;
    }
    setValues((prev) => ({ ...prev, mm_password: value }));

    const validate_password = RegexpPasswordCheck(value);
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

    const validate_password = value == values?.mm_password;
    setValidate((prev) => ({
      ...prev,
      confirm_password: validate_password,
    }));
  };
  return (
    <>
      <Spin spinning={loading}>
        <CustomRow className="margin-top-2">
          <CustomCol span={24}>
            <CustomText weight={"bold"} size="sm">
              {t("profile.new.pw")}
            </CustomText>
          </CustomCol>
          <CustomCol span={12} className="margin-top-05">
            <CustomInput
              type="password"
              placeholder={t("profile.new.pw1") || ""}
              onKeyDown={handleKeyPress}
              onChange={handlePasswordValidate}
            ></CustomInput>
          </CustomCol>
        </CustomRow>
        {!validate?.validate_password &&
          values?.mm_password &&
          values?.mm_password?.length > 0 && (
            <CustomRow className="margin-top-05">
              <CustomCol span={8} className="flex justify-start">
                <CustomText color={AppTheme.color.error} size="ti">
                  {t("message.err.password_validate")}
                </CustomText>
              </CustomCol>
            </CustomRow>
          )}
        <CustomRow className="margin-top-2">
          <CustomCol span={24}>
            <CustomText weight={"bold"} size="sm">
              {t("up.cpw")}
            </CustomText>
          </CustomCol>
          <CustomCol span={12} className="margin-top-05">
            <CustomInput
              placeholder={t("up.2epw") || ""}
              type="password"
              onKeyDown={handleKeyPress}
              onChange={handlePasswordConfirm}
            ></CustomInput>
          </CustomCol>
        </CustomRow>
        {!validate?.confirm_password &&
          values?.password_confirm &&
          values?.password_confirm?.length > 0 && (
            <CustomRow className="margin-top-05">
              <CustomCol span={8} className="flex justify-start">
                <CustomText color={AppTheme.color.error} size="ti">
                  {t("up.epw.error")}
                </CustomText>
              </CustomCol>
            </CustomRow>
          )}
        <CustomRow className="margin-top-2 gap-1">
          <CustomButton width={"10rem"} onClick={hanldeSummit}>
            <CustomText color={AppTheme.color.white} weight="bold">
              {t("profile.botton.change")}
            </CustomText>
          </CustomButton>
          <CustomButton
            width={"10rem"}
            style_type="secondary"
            onClick={() => {
              setCurrent(PAGES.default);
            }}
          >
            <CustomText color={AppTheme.color.white} weight="bold">
              {t("profile.botton.back")}
            </CustomText>
          </CustomButton>
        </CustomRow>
      </Spin>
    </>
  );
};
