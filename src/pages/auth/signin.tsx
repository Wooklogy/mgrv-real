/* eslint-disable react-hooks/exhaustive-deps */
import CustomInput from "@/components/input/Input.comp";
import { APIAuthLoginType } from "@/apis/auth/auth.api.d";
import { useRouter } from "next/router";
import React from "react";
import { APIAuthLogin } from "@/apis/auth/auth.api";
import { useMutation } from "react-query";
import { message } from "antd";
import usePrincipal from "@/hooks/usePrincipal";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { recoilState_Resize } from "@/recoils/states.recoil";
import { routerPath } from "@/utils/router.util";
import ResponseLayout from "@/layouts/Response.layout";
import CustomRow from "@/components/grids/Row.grid";
import CustomCol from "@/components/grids/Col.grid";
import CustomText from "@/components/texts/Text";
import { AppTheme, ResoulutionReturner } from "@/styles/global.style";
import CustomButton from "@/components/buttons/Button";

const AuthSigninPage: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const windowWidth = useRecoilValue(recoilState_Resize);
  const [values, setValue] = React.useState<APIAuthLoginType>();
  const { isSuccess, principal, refreshPrincipal } = usePrincipal();
  const [loading, setIsLoading] = React.useState<boolean>(false);
  const loginResponse = useMutation(APIAuthLogin, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onError(error: AxiosError | any, variables, context) {
      const msg: any = error.response?.data.message;
      message.error(t(msg) || error.response.status);
    },
    onSuccess: () => {
      refreshPrincipal();
    },
  });
  React.useEffect(() => {
    if (isSuccess) {
      if (principal) {
        router.push(routerPath.root);
      }
    }
  }, [principal]);
  const handleChangeEmail = (e: any) => {
    const value = e?.target?.value || e;
    setValue((prev) => ({ ...prev, mm_identity: value }));
  };

  const handleChangePassword = (e: any) => {
    const value = e?.target?.value || e;
    setValue((prev) => ({ ...prev, mm_password: value }));
  };
  const handleKeyPress = (e: any) => {
    if (e.key == "Enter") {
      e.preventDefault();
      handleLoginClick();
    }
  };
  const handleLoginClick = async () => {
    loginResponse.mutate(values);
  };
  return (
    <ResponseLayout loading={loading}>
      <CustomRow>
        <CustomCol span={24} className="margin-top-5 flex justify-center">
          <CustomText size="xl" weight={"bold"}>
            {t("in.welcome")}
          </CustomText>
        </CustomCol>
        <CustomCol span={24} className="margin-top-05 flex justify-center">
          <CustomText size="sm" weight={"bold"}>
            {t("in.account")}
          </CustomText>
        </CustomCol>
      </CustomRow>
      <CustomRow justify={"center"} className="margin-top-4">
        <CustomCol
          span={ResoulutionReturner(windowWidth, 8, 16, 23, 23)}
          className="flex justify-start"
        >
          <CustomText size="sm" weight={"bold"}>
            {t("in.email")}
          </CustomText>
        </CustomCol>
      </CustomRow>
      <CustomRow justify={"center"} className="margin-top-05">
        <CustomCol
          span={ResoulutionReturner(windowWidth, 8, 16, 23, 23)}
          className="flex justify-start"
        >
          <CustomInput
            placeholder={t("in.email1") || ""}
            onKeyDown={handleKeyPress}
            onChange={handleChangeEmail}
          ></CustomInput>
        </CustomCol>
      </CustomRow>
      <CustomRow justify={"center"} className="margin-top-1">
        <CustomCol
          span={ResoulutionReturner(windowWidth, 8, 16, 23, 23)}
          className="flex justify-start"
        >
          <CustomText size="sm" weight={"bold"}>
            {t("in.password")}
          </CustomText>
        </CustomCol>
      </CustomRow>
      <CustomRow justify={"center"} className="margin-top-05">
        <CustomCol
          span={ResoulutionReturner(windowWidth, 8, 16, 23, 23)}
          className="flex justify-start"
        >
          <CustomInput
            type="password"
            placeholder={t("in.password1") || ""}
            onKeyDown={handleKeyPress}
            onChange={handleChangePassword}
          ></CustomInput>
        </CustomCol>
      </CustomRow>
      <CustomRow justify={"center"} className="margin-top-2">
        <CustomCol
          span={ResoulutionReturner(windowWidth, 8, 16, 23, 23)}
          className="flex justify-start"
        >
          <CustomButton width={"100%"} onClick={handleLoginClick}>
            <CustomText weight={"bold"} color={AppTheme.color.white}>
              {t("voca.login")}
            </CustomText>
          </CustomButton>
        </CustomCol>
      </CustomRow>
      <CustomRow justify={"center"} className="margin-top-05">
        <CustomCol
          span={ResoulutionReturner(windowWidth, 8, 16, 23, 23)}
          className="flex justify-start"
        >
          <CustomButton
            width={"100%"}
            style_type="line"
            onClick={() => {
              router.push(routerPath.signup);
            }}
          >
            <CustomText weight={"bold"}>{t("in.1account")}</CustomText>
          </CustomButton>
        </CustomCol>
      </CustomRow>
      <CustomRow className="margin-top-3">
        {/* todo */}
        <CustomCol span={24} className="flex justify-center">
          <CustomText size="sm" weight={"bold"}>
            {t("in.forgot")}
          </CustomText>
          <CustomText
            size="sm"
            weight={"bold"}
            cursor={"pointer"}
            style_type="primary"
            class_name="margin-left-05"
            onClick={() => {
              router.push("security/password");
            }}
          >
            {t("find.password")}
          </CustomText>
        </CustomCol>
      </CustomRow>
    </ResponseLayout>
  );
};
export default AuthSigninPage;
