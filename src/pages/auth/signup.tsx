/* eslint-disable react-hooks/exhaustive-deps */

import CustomInput from "@/components/input/Input.comp";

import { APIAuthUserType } from "@/apis/auth/auth.api.d";

import { useRouter } from "next/router";
import React from "react";
import {
  APIAuthCreate,
  APICheckUniqeEmail,
  APICheckUniqeNickname,
  APISendEmailCode,
  APIVerifyEmailCode,
} from "@/apis/auth/auth.api";
import { useMutation } from "react-query";
import { message } from "antd";
import usePrincipal from "@/hooks/usePrincipal";
import OTPInput from "@/components/input/OTP.input.comp";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { recoilState_Resize } from "@/recoils/states.recoil";
import { routerPath } from "@/utils/router.util";
import {
  RegexpEmailCheck,
  RegexpNicknameCheck,
  RegexpPasswordCheck,
} from "@/utils/regexp.util";
import ResponseLayout from "@/layouts/Response.layout";
import CustomRow from "@/components/grids/Row.grid";
import CustomCol from "@/components/grids/Col.grid";
import CustomText from "@/components/texts/Text";
import { AppTheme, ResoulutionReturner } from "@/styles/global.style";
import CustomButton from "@/components/buttons/Button";
import CustomCheckBox from "@/components/checkboxs/Checkbox.comp";
export interface DoneCheckType {
  name?: boolean;
  last_name?: boolean;
  email?: boolean;
  password?: boolean;
  passwordConfirm?: boolean;
  email_confirm?: boolean;
  nickname?: boolean;
  term?: boolean;
}
export interface ValidateCheckType {
  // 이메일 중복
  duplicate_email?: boolean;
  // 이메일 형식
  validate_email?: boolean;
  // 이메일 형식
  confirm_email?: boolean;
  //   패스워드 형식
  validate_password?: boolean;
  //   비밀번호 확인
  confirm_password?: boolean;
  //   닉네임 중복
  duplicate_nickname?: boolean;
  //    닉네임 형식
  validate_nickname?: boolean;
  //   이름 형식
  validate_name?: boolean;
  // 라스트네임 형식
  validate_lastname?: boolean;
}
const AuthSignupPage: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { principal, isSuccess } = usePrincipal();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [done, setDone] = React.useState<DoneCheckType>();
  const [validate, setValidate] = React.useState<ValidateCheckType>();
  const [values, setValues] = React.useState<APIAuthUserType>();
  const [disableEmail, setDisableEmail] = React.useState<boolean>(false);
  const windowWidth = useRecoilValue(recoilState_Resize);
  const [emailAuthValue, setEmailAUthValue] = React.useState<string>();
  const [visibleEmailVerify, setVisibleEmailVerify] =
    React.useState<boolean>(false);
  // 회원가입
  const createPost = useMutation(APIAuthCreate, {
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: (error: AxiosError | any) => {
      const msg = error.response?.data.message;
      message.error(t(msg));
    },
    onSuccess: () => {
      message.success(t("message.scc.signup"));
      router.push(routerPath.login);
    },
  });
  // 인증 코드 전송
  const sendEmailCode = useMutation(APISendEmailCode, {
    onMutate: () => {
      setLoading(true);
    },
    onError: (error: any) => {
      const msg = error.response?.data.message;
      message.error(t(msg));
    },
    onSuccess: () => {
      message.info(t("message.info.send_authkey"));
      setLoading(false);
      setVisibleEmailVerify(true);
      setDisableEmail(true);
    },
  });
  // 인증 코드 확인
  const sendEmailVerify = useMutation(APIVerifyEmailCode, {
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: (error: any) => {
      const msg = error.response?.data.message;
      message.error(t(msg));
    },
    onSuccess: (res: any) => {
      setVisibleEmailVerify(false);
      setDisableEmail(true);
      setDone((prev) => ({
        ...prev,
        email_confirm: true,
        email: true,
      }));
      setValues((prev) => ({ ...prev, mm_authkey: "true" }));
      message.success(t("message.scc.signup"));
      localStorage.removeItem("email_auth_key");
    },
  });
  // 인증코드 전송
  const handleEmailCodeSend = () => {
    console.log(!validate?.validate_email && !validate?.duplicate_email);

    if (!(!validate?.validate_email && !validate?.duplicate_email)) {
      message.error(t("message.err.email_validate"));
      setVisibleEmailVerify(false);
      return;
    }
    sendEmailCode.mutate(values?.mm_identity || "");
  };

  //인증코드 확인
  const handleEmailCodeVerify = () => {
    sendEmailVerify.mutate({
      email: values?.mm_identity,
      code: emailAuthValue,
    });
  };

  const handleKeyPress = (e: any) => {
    if (e.key == "Enter") {
      e.preventDefault();
      hanldeSummit();
    }
  };
  const hanldeSummit = () => {
    if (!done?.email) {
      message.error(t("message.err.email_validate"));
      return false;
    }
    if (!done?.email_confirm) {
      message.error(t("message.err.not_email_auth_key"));
      return false;
    }

    if (!done?.last_name && !done.name) {
      message.error(t("message.err.name_validate"));
      return false;
    }
    if (!done?.nickname) {
      message.error(t("message.err.nickname_validate"));
      return false;
    }
    if (!done?.password) {
      message.error(t("message.err.password_validate"));
      return false;
    }
    if (!done?.passwordConfirm) {
      message.error(t("message.err.password_confirm_validate"));
      return false;
    }
    if (!done?.term) {
      message.error(t("message.err.not_check_term"));
      return false;
    }
    createPost.mutate(values);
  };
  React.useEffect(() => {
    if (isSuccess) {
      if (principal) {
        router.back();
      }
    }
  }, [principal]);
  // 이름 검사
  const handleNameValidate = (e: any) => {
    const value: string = e?.target?.value || e;
    if (value.length === undefined) {
      setValidate((prev) => ({ ...prev, validate_name: true }));
      setDone((prev) => ({ ...prev, name: false }));
      return;
    } else {
      setValues((prev) => ({ ...prev, mm_name: value }));

      setValidate((prev) => ({ ...prev, validate_name: false }));
      setDone((prev) => ({ ...prev, name: true }));
    }
  };
  //   라스트 네임 검사
  const handleLastNameValidate = (e: any) => {
    const value: string = e?.target?.value || e;
    if (value.length === undefined) {
      setValidate((prev) => ({ ...prev, validate_lastname: true }));
      setDone((prev) => ({ ...prev, last_name: false }));
      return;
    } else {
      setValues((prev) => ({ ...prev, last_name: value }));

      setValidate((prev) => ({ ...prev, validate_lastname: false }));
      setDone((prev) => ({ ...prev, validate_lastname: true }));
    }
  };

  //   이메일 유효성 검사
  const handleEmailValidate = async (e: any) => {
    const value: string = e?.target?.value || e;

    if (value.length === undefined) {
      setValidate((prev) => ({
        ...prev,
        duplicate_email: false,
        validate_email: false,
      }));
      setDone((prev) => ({ ...prev, email: false }));
      return;
    }

    setValues((prev) => ({ ...prev, mm_identity: value }));
    const validate_email = RegexpEmailCheck(value);
    if (!validate_email) {
      setValidate((prev) => ({ ...prev, validate_email: true }));
      setDone((prev) => ({ ...prev, email: false }));
      return;
    } else {
      setValidate((prev) => ({ ...prev, validate_email: false }));
    }
    // 중복
    const duplicate_email = await APICheckUniqeEmail(value);
    if (!duplicate_email) {
      setValidate((prev) => ({ ...prev, duplicate_email: true }));
      setDone((prev) => ({ ...prev, email: false }));

      return;
    } else {
      setValidate((prev) => ({ ...prev, duplicate_email: false }));
    }
    if (validate_email && duplicate_email) {
      setDone((prev) => ({ ...prev, email: true }));
    }
  };

  //   비밀번호 유효성 검사
  const handlePasswordValidate = (e: any) => {
    const value: string = e?.target?.value || e;
    if (value === undefined) {
      setValidate((prev) => ({ ...prev, validate_password: false }));
      setDone((prev) => ({ ...prev, password: false }));
      return;
    }
    setValues((prev) => ({ ...prev, mm_password: value }));

    const validate_password = RegexpPasswordCheck(value);
    if (!validate_password) {
      setValidate((prev) => ({ ...prev, validate_password: true }));
      setDone((prev) => ({ ...prev, password: false }));
    } else {
      setValidate((prev) => ({ ...prev, validate_password: false }));
      setDone((prev) => ({ ...prev, password: true }));
    }
  };

  //   비밀번호 확인
  const handlePasswordConfirm = (e: any) => {
    const value: string = e?.target?.value || e;
    if (value === undefined) {
      setValidate((prev) => ({ ...prev, confirm_password: false }));
      return;
    }

    const validate_password = value == values?.mm_password;
    if (!validate_password) {
      setValidate((prev) => ({ ...prev, confirm_password: true }));
      setDone((prev) => ({ ...prev, passwordConfirm: false }));
    } else {
      setValidate((prev) => ({ ...prev, confirm_password: false }));
      setDone((prev) => ({ ...prev, passwordConfirm: true }));
    }
  };

  //   닉네임 확인
  const handleNicknameValidate = async (e: any) => {
    const value: string = e?.target?.value || e;
    if (value.length === undefined) {
      setValidate((prev) => ({ ...prev, duplicate_nickname: false }));
      setValidate((prev) => ({ ...prev, validate_nickname: false }));
      setDone((prev) => ({ ...prev, nickname: false }));
      return;
    }
    setValues((prev) => ({ ...prev, mm_nickname: value }));
    const validate_nickname = RegexpNicknameCheck(value);
    if (!validate_nickname) {
      setValidate((prev) => ({ ...prev, validate_nickname: true }));
      setDone((prev) => ({ ...prev, nickname: false }));
      return;
    } else {
      setValidate((prev) => ({ ...prev, validate_nickname: false }));
    }
    const duplicate_nickname = await APICheckUniqeNickname(value);
    if (!duplicate_nickname) {
      setValidate((prev) => ({ ...prev, duplicate_nickname: true }));
      setDone((prev) => ({ ...prev, nickname: false }));

      return;
    } else {
      setValidate((prev) => ({ ...prev, duplicate_nickname: false }));
    }
    if (validate_nickname && duplicate_nickname) {
      setDone((prev) => ({ ...prev, nickname: true }));
    }
  };

  //   사용 약관 동의
  const handleTermConfirm = (v: any) => {
    setDone((prev) => ({ ...prev, term: v.target.checked }));
  };

  return (
    <ResponseLayout loading={loading}>
      <CustomRow>
        <CustomCol span={24} className="margin-top-5 flex justify-center">
          <CustomText size="xl" weight={"bold"}>
            {t("up.started")}
          </CustomText>
        </CustomCol>
        <CustomCol span={24} className="margin-top-05 flex justify-center">
          <CustomText size="sm" weight={"bold"}>
            {t("up.proceed")}
          </CustomText>
        </CustomCol>
      </CustomRow>
      {/* 이름 */}
      <CustomRow justify={"center"} className="margin-top-4">
        <CustomCol
          span={ResoulutionReturner(windowWidth, 8, 12, 23, 23)}
          className="flex justify-start"
        >
          <CustomText size="sm" weight={"bold"}>
            {t("up.full")}
          </CustomText>
        </CustomCol>
      </CustomRow>
      <CustomRow justify={"center"} className="margin-top-05">
        <CustomCol
          span={ResoulutionReturner(windowWidth, 8, 12, 23, 23)}
          className="flex justify-start"
        >
          <CustomCol span={16}>
            <CustomInput
              placeholder={t("up.full") || ""}
              onKeyDown={handleKeyPress}
              onChange={handleNameValidate}
            ></CustomInput>
          </CustomCol>
          <CustomCol span={7} offset={1}>
            <CustomInput
              placeholder={t("up.last") || ""}
              onKeyDown={handleKeyPress}
              onChange={handleLastNameValidate}
            ></CustomInput>
          </CustomCol>
        </CustomCol>
      </CustomRow>
      {(validate?.validate_name || validate?.validate_lastname) && (
        <CustomRow justify={"center"} className="margin-top-05">
          <CustomCol
            span={ResoulutionReturner(windowWidth, 8, 12, 23, 23)}
            className="flex justify-start"
          >
            <CustomText color={AppTheme.color.error} size="ti">
              {t("message.err.name_validate")}
            </CustomText>
          </CustomCol>
        </CustomRow>
      )}

      {/* 이메일 */}
      <CustomRow justify={"center"} className="margin-top-2">
        <CustomCol
          span={ResoulutionReturner(windowWidth, 8, 12, 23, 23)}
          className="flex justify-start"
        >
          <CustomText size="sm" weight={"bold"}>
            {t("up.address")}
          </CustomText>
        </CustomCol>
      </CustomRow>
      <CustomRow justify={"center"} className="margin-top-05">
        <CustomCol
          span={ResoulutionReturner(windowWidth, 8, 12, 23, 23)}
          className="flex justify-start"
        >
          <CustomCol span={16}>
            <CustomInput
              placeholder={t("up.address") || ""}
              onKeyDown={handleKeyPress}
              onChange={handleEmailValidate}
              disabled={disableEmail}
            ></CustomInput>
          </CustomCol>
          <CustomCol span={7} offset={1}>
            <CustomButton width={"100%"} onClick={handleEmailCodeSend}>
              <CustomText color={AppTheme.color.white}>
                {visibleEmailVerify ? t("up.code.resend") : t("up.button.code")}
              </CustomText>
            </CustomButton>
          </CustomCol>
        </CustomCol>
      </CustomRow>
      {(validate?.validate_email || validate?.duplicate_email) && (
        <CustomRow justify={"center"} className="margin-top-05">
          <CustomCol
            span={ResoulutionReturner(windowWidth, 8, 12, 23, 23)}
            className="flex justify-start"
          >
            <CustomText color={AppTheme.color.error} size="ti">
              {(validate.duplicate_email && t("up.add.error")) ||
                (validate.validate_email && t("message.err.email_validate"))}
            </CustomText>
          </CustomCol>
        </CustomRow>
      )}
      {/* 이메일 인증 */}
      {visibleEmailVerify && (
        <CustomRow justify={"center"} className="margin-top-05">
          <CustomCol
            span={ResoulutionReturner(windowWidth, 8, 12, 23, 23)}
            className="flex-column justify-start align-start"
          >
            <CustomRow>
              <CustomText color={AppTheme.color.text_second}>
                {t("up.subtext")}
                <br /> {t("up.5min")}
              </CustomText>
            </CustomRow>
            <CustomRow className="margin-top-05">
              <OTPInput
                gap={"1rem"}
                onCustomChange={(v) => {
                  setEmailAUthValue(v);
                }}
                maxcount={6}
                font_size={"1.2rem"}
                width={"20%"}
                height={"5rem"}
              ></OTPInput>
            </CustomRow>
            <CustomRow className="margin-top-1 justify-end flex">
              <CustomCol span={6}>
                <CustomButton width={"100%"} onClick={handleEmailCodeVerify}>
                  <CustomText color={AppTheme.color.white}>
                    {t("create.confirm")}
                  </CustomText>
                </CustomButton>
              </CustomCol>
            </CustomRow>
          </CustomCol>
        </CustomRow>
      )}

      {/* 비밀번호 */}
      <CustomRow justify={"center"} className="margin-top-2">
        <CustomCol
          span={ResoulutionReturner(windowWidth, 8, 12, 23, 23)}
          className="flex justify-start"
        >
          <CustomText size="sm" weight={"bold"}>
            {t("in.password")}
          </CustomText>
        </CustomCol>
      </CustomRow>
      <CustomRow justify={"center"} className="margin-top-05">
        <CustomCol
          span={ResoulutionReturner(windowWidth, 8, 12, 23, 23)}
          className="flex justify-start"
        >
          <CustomInput
            type="password"
            placeholder={t("in.password") || ""}
            onKeyDown={handleKeyPress}
            onChange={handlePasswordValidate}
          ></CustomInput>
        </CustomCol>
      </CustomRow>
      {validate?.validate_password && (
        <CustomRow justify={"center"} className="margin-top-05">
          <CustomCol
            span={ResoulutionReturner(windowWidth, 8, 12, 23, 23)}
            className="flex justify-start"
          >
            <CustomText color={AppTheme.color.error} size="ti">
              {t("message.err.password_validate")}
            </CustomText>
          </CustomCol>
        </CustomRow>
      )}
      {/* 비밀번호 확인 */}
      <CustomRow justify={"center"} className="margin-top-1">
        <CustomCol
          span={ResoulutionReturner(windowWidth, 8, 12, 23, 23)}
          className="flex justify-start"
        >
          <CustomText size="sm" weight={"bold"}>
            {t("up.cpw")}
          </CustomText>
        </CustomCol>
      </CustomRow>
      <CustomRow justify={"center"} className="margin-top-05">
        <CustomCol
          span={ResoulutionReturner(windowWidth, 8, 12, 23, 23)}
          className="flex justify-start"
        >
          <CustomInput
            type="password"
            placeholder={t("up.cpw") || ""}
            onKeyDown={handleKeyPress}
            onChange={handlePasswordConfirm}
          ></CustomInput>
        </CustomCol>
      </CustomRow>
      {validate?.confirm_password && (
        <CustomRow justify={"center"} className="margin-top-05">
          <CustomCol
            span={ResoulutionReturner(windowWidth, 8, 12, 23, 23)}
            className="flex justify-start"
          >
            <CustomText color={AppTheme.color.error} size="ti">
              {t("up.epw.error")}
            </CustomText>
          </CustomCol>
        </CustomRow>
      )}
      {/* 닉네임 */}
      <CustomRow justify={"center"} className="margin-top-3">
        <CustomCol
          span={ResoulutionReturner(windowWidth, 8, 12, 23, 23)}
          className="flex justify-start"
        >
          <CustomText size="sm" weight={"bold"}>
            {t("up.dname")}
          </CustomText>
        </CustomCol>
      </CustomRow>
      <CustomRow justify={"center"} className="margin-top-05">
        <CustomCol
          span={ResoulutionReturner(windowWidth, 8, 12, 23, 23)}
          className="flex justify-start"
        >
          <CustomInput
            placeholder={t("up.dname") || ""}
            onKeyDown={handleKeyPress}
            onChange={handleNicknameValidate}
          ></CustomInput>
        </CustomCol>
      </CustomRow>
      {(validate?.validate_nickname || validate?.duplicate_nickname) && (
        <CustomRow justify={"center"} className="margin-top-05">
          <CustomCol
            span={ResoulutionReturner(windowWidth, 8, 12, 23, 23)}
            className="flex justify-start"
          >
            <CustomText color={AppTheme.color.error} size="ti">
              {(validate.duplicate_nickname && t("up.display.error")) ||
                (validate.validate_nickname &&
                  t("message.err.nickname_validate"))}
            </CustomText>
          </CustomCol>
        </CustomRow>
      )}
      {/* 약관 */}
      <CustomRow justify={"center"} className="margin-top-1">
        <CustomCol
          span={ResoulutionReturner(windowWidth, 8, 12, 23, 23)}
          className="flex justify-start"
        >
          <CustomCheckBox onChange={handleTermConfirm}>
            {t("up.agree")}
          </CustomCheckBox>
        </CustomCol>
      </CustomRow>
      {/* 아래요소 */}
      <CustomRow justify={"center"} className="margin-top-3">
        <CustomCol
          span={ResoulutionReturner(windowWidth, 8, 12, 23, 23)}
          className="flex justify-start"
        >
          <CustomButton width={"100%"} onClick={hanldeSummit}>
            <CustomText weight={"bold"} color={AppTheme.color.white}>
              {t("in.1account")}
            </CustomText>
          </CustomButton>
        </CustomCol>
      </CustomRow>
      <CustomRow className="margin-top-3">
        <CustomCol span={24} className="flex justify-center">
          <CustomText size="sm" weight={"bold"}>
            {t("up.already")}
          </CustomText>
          <CustomText
            size="sm"
            weight={"bold"}
            cursor={"pointer"}
            style_type="primary"
            class_name="margin-left-05"
            onClick={() => {
              router.push(routerPath.login);
            }}
          >
            {t("voca.login")}
          </CustomText>
        </CustomCol>
      </CustomRow>
    </ResponseLayout>
  );
};
export default AuthSignupPage;
