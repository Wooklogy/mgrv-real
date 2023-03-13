import { APIAccountModifyProfileProps } from "@/apis/account/account.api.d";
import {
  APIAccountModifyNickname,
  APIAccountModifyProfile,
} from "@/apis/account/account.api";
import { APICheckUniqeNickname } from "@/apis/auth/auth.api";

import CustomInput from "@/components/input/Input.comp";

import usePrincipal from "@/hooks/usePrincipal";

import { DatePicker, message, Select, Spin } from "antd";
import dayjs from "dayjs";
import React from "react";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import { RegexpNicknameCheck } from "@/utils/regexp.util";
import AccountSettingLayout from "@/layouts/AccountSetting.layout";
import CustomRow from "@/components/grids/Row.grid";
import CustomCol from "@/components/grids/Col.grid";
import CustomText from "@/components/texts/Text";
import { AppTheme } from "@/styles/global.style";
import CustomButton from "@/components/buttons/Button";
interface ValidateCheckType {
  //   닉네임 중복
  duplicate_nickname?: boolean;
  //    닉네임 형식
  validate_nickname?: boolean;
}
const ProfileSettingPage: React.FC = () => {
  const { t } = useTranslation();
  const { principal, refreshPrincipal } = usePrincipal();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [validate, setValidate] = React.useState<ValidateCheckType>();
  const [value, setValue] = React.useState<string>("");
  const [profile, setProfile] = React.useState<APIAccountModifyProfileProps>();
  const apiChangeNickname = useMutation(APIAccountModifyNickname, {
    onMutate: (variable) => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
    onError(error: any, variables, context) {
      message.error(t(error.response?.data?.message));
    },
    onSuccess: () => {
      message.success(t("message.success.change_nickname"));
      refreshPrincipal();
    },
  });
  const apiChangeProfile = useMutation(APIAccountModifyProfile, {
    onMutate: (variable) => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
    onError(error: any, variables, context) {
      message.error(t(error.response?.data?.message));
    },
    onSuccess: () => {
      message.success(t("message.success.change_profile"));
      refreshPrincipal();
    },
  });
  const [ableModifyNickname, setAbleModifyNickname] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const now = dayjs();
    const lastDay = dayjs(principal?.updated_nickname_at);
    setValue(principal?.mm_nickname || "");

    if (now.diff(lastDay, "day") < 30) {
      setAbleModifyNickname(true);
    } else {
      setAbleModifyNickname(false);
    }
  }, [principal]);
  const handleNicknameValidate = async (e: any) => {
    const value: string = e?.target?.value;
    setValue(value);
    const validate_nickname = RegexpNicknameCheck(value);
    const duplicate_nickname = Boolean(await APICheckUniqeNickname(value));
    setValidate({
      duplicate_nickname: duplicate_nickname,
      validate_nickname: validate_nickname,
    });
  };
  const handleKeyPressNickname = (e: any) => {
    if (e.key == "Enter") {
      e.preventDefault();
      handleChangeNickname();
    }
  };
  const handleChangeNickname = () => {
    if (ableModifyNickname) {
      const now = dayjs();
      const lastDay = dayjs(principal?.updated_nickname_at);
      message.error(
        t("message.err.wait_date", { number: 30 - now.diff(lastDay, "day") })
      );

      return;
    }
    if (!validate?.validate_nickname) {
      message.error(t("message.err.nickname_validate"));
      return;
    }
    if (!validate?.duplicate_nickname) {
      message.error(t("message.err.nickname_duplicate"));
      return;
    }

    if (window.confirm(t("message.confirm.chage_nickname") || "")) {
      apiChangeNickname.mutate(value);
    }
  };
  const handleClickProfile = () => {
    if (window.confirm(t("message.confirm.chage_profile") || "")) {
      apiChangeProfile.mutate(profile);
    }
  };
  return (
    <AccountSettingLayout>
      <Spin spinning={loading}>
        <CustomRow className="margin-top-3">
          <CustomCol span={24}>
            <CustomText weight={"bold"} size="lg">
              {t("profile.display")}
            </CustomText>
          </CustomCol>
        </CustomRow>
        <CustomRow className="margin-top-05">
          <CustomCol span={24}>
            <CustomText size="ti" color={AppTheme.color.text_second}>
              {t("profile.display1")}
            </CustomText>
          </CustomCol>
        </CustomRow>
        <CustomRow className="margin-top-05">
          <CustomCol span={8}>
            <CustomInput
              placeholder={t("profile.display") || ""}
              onKeyDown={handleKeyPressNickname}
              onChange={handleNicknameValidate}
              value={value}
              disabled={ableModifyNickname}
            ></CustomInput>
          </CustomCol>
          <CustomCol span={8} className="margin-left-05">
            <CustomButton onClick={handleChangeNickname}>
              <CustomText color={AppTheme.color.white}>
                {t("profile.botton.change1")}
              </CustomText>
            </CustomButton>
          </CustomCol>
        </CustomRow>
        {(validate?.validate_nickname || validate?.duplicate_nickname) && (
          <CustomRow justify={"start"} className="margin-top-05">
            <CustomCol span={8} className="flex justify-start">
              <CustomText color={AppTheme.color.error} size="ti">
                {(value?.length > 0 &&
                  !validate.duplicate_nickname &&
                  t("message.err.nickname_duplicate")) ||
                  (!validate.validate_nickname &&
                    t("message.err.nickname_validate"))}
              </CustomText>
            </CustomCol>
          </CustomRow>
        )}
        <CustomRow className="margin-top-2">
          <CustomCol span={24}>
            <CustomText weight={"bold"} size="lg">
              {t("profile.country")}
            </CustomText>
          </CustomCol>
        </CustomRow>
        <CustomRow className="margin-top-05">
          <CustomCol span={8}>
            <Select
              bordered={false}
              onChange={(val) => {
                setProfile((prev: any) => ({
                  ...prev,
                  country_code: val,
                }));
              }}
              value={profile?.country_code || principal?.country_code || "KR"}
              options={[
                {
                  label: t("country.kr"),
                  key: "KR",
                  value: "KR",
                },
                {
                  label: t("country.us"),
                  key: "US",
                  value: "US",
                },
                {
                  label: t("country.vn"),
                  key: "VN",
                  value: "VN",
                },
                {
                  label: t("country.sg"),
                  key: "SG",
                  value: "SG",
                },
                {
                  label: t("country.jp"),
                  key: "JP",
                  value: "JP",
                },
                {
                  label: t("country.th"),
                  key: "TH",
                  value: "TH",
                },
              ]}
              style={{ width: "100%" }}
            ></Select>
          </CustomCol>
        </CustomRow>
        <CustomRow className="margin-top-2">
          <CustomCol span={24}>
            <CustomText weight={"bold"} size="lg">
              {t("profile.birth")}
            </CustomText>
          </CustomCol>
        </CustomRow>
        <CustomRow className="margin-top-05 gap-1">
          <CustomCol span={12}>
            <DatePicker
              bordered={false}
              onChange={(val, _val) => {
                setProfile((prev: any) => ({
                  ...prev,
                  birth_date: dayjs().isAfter(_val) ? dayjs() : _val,
                }));
              }}
              disabledDate={(d) => d.isAfter(dayjs())}
              value={dayjs(
                profile?.birth_date || principal?.birth_date || undefined
              )}
              style={{ width: "100%" }}
            ></DatePicker>
          </CustomCol>
        </CustomRow>
        <CustomRow className="margin-top-3">
          <CustomButton onClick={handleClickProfile}>
            <CustomText color={AppTheme.color.white}>
              {t("profile.botton.change1")}
            </CustomText>
          </CustomButton>
        </CustomRow>
      </Spin>
    </AccountSettingLayout>
  );
};

export default ProfileSettingPage;
