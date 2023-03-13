import CustomButton from "@/components/buttons/Button";
import CustomCheckBox from "@/components/checkboxs/Checkbox.comp";
import CustomCol from "@/components/grids/Col.grid";
import CustomRow from "@/components/grids/Row.grid";
import CustomInput from "@/components/input/Input.comp";
import CustomTextArea from "@/components/input/TextArea.input.comp";
import CustomUploader from "@/components/input/Uploader.input";
import CustomText from "@/components/texts/Text";
import ResponseLayout from "@/layouts/Response.layout";
import { recoilState_Resize } from "@/recoils/states.recoil";
import { AppTheme, ResoulutionReturner } from "@/styles/global.style";
import { Divider } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

interface toggleProps {
  game?: boolean;
  platform?: boolean;
  marketing?: boolean;
  other?: boolean;
}

const MainSupportPage: React.FC = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = React.useState<toggleProps>();
  const windowWidth = useRecoilValue(recoilState_Resize);
  return (
    <ResponseLayout>
      <CustomRow className="margin-top-5">
        <CustomText size="xxl" weight={700}>
          {t("suport.partner")}
        </CustomText>
      </CustomRow>
      <Divider></Divider>
      <CustomRow>
        <CustomCol span={24}>
          <CustomText size="lg" weight={700}>
            {t("suport.category")}
          </CustomText>
        </CustomCol>
        <CustomCol span={24} className="margin-top-05">
          <CustomText color={AppTheme.color.text_second}>
            {t("suport.select")}
          </CustomText>
        </CustomCol>
      </CustomRow>
      <CustomRow className="margin-top-2 gap-1">
        <CustomButton
          active={selected?.game}
          style_type="line"
          size="large"
          onClick={() => {
            setSelected((prev) => ({
              ...prev,
              game: !selected?.game,
            }));
          }}
        >
          <CustomText
            weight={"bold"}
            color={(selected?.game && AppTheme.color.white) || undefined}
          >
            {t("voca.game")}
          </CustomText>
        </CustomButton>
        <CustomButton
          active={selected?.platform}
          style_type="line"
          size="large"
          onClick={() => {
            setSelected((prev) => ({
              ...prev,
              platform: !selected?.platform,
            }));
          }}
        >
          <CustomText
            weight={"bold"}
            color={(selected?.platform && AppTheme.color.white) || undefined}
          >
            {t("voca.platform")}
          </CustomText>
        </CustomButton>
        <CustomButton
          active={selected?.marketing}
          style_type="line"
          size="large"
          onClick={() => {
            setSelected((prev) => ({
              ...prev,
              marketing: !selected?.marketing,
            }));
          }}
        >
          <CustomText
            weight={"bold"}
            color={(selected?.marketing && AppTheme.color.white) || undefined}
          >
            {t("voca.marketing")}
          </CustomText>
        </CustomButton>
        <CustomButton
          active={selected?.other}
          style_type="line"
          size="large"
          onClick={() => {
            setSelected((prev) => ({ ...prev, other: !selected?.other }));
          }}
        >
          <CustomText
            weight={"bold"}
            color={(selected?.other && AppTheme.color.white) || undefined}
          >
            {t("voca.other")}
          </CustomText>
        </CustomButton>
      </CustomRow>
      <CustomRow className="margin-top-5">
        <CustomText size="lg" weight={"bold"}>
          {t("suport.partnership")}
        </CustomText>
      </CustomRow>

      <CustomRow className="margin-top-4">
        <CustomCol span={24}>
          <CustomText size="lg" weight={"bold"}>
            {t("voca.title")}{" "}
            <CustomText color={AppTheme.color.error}>*</CustomText>
          </CustomText>
        </CustomCol>
        <CustomCol
          span={ResoulutionReturner(windowWidth, 12, 24, 24, 24)}
          className="margin-top-05"
        >
          <CustomInput placeholder={t("voca.title") || ""}></CustomInput>
        </CustomCol>
      </CustomRow>
      <CustomRow className="margin-top-2">
        <CustomCol span={24}>
          <CustomText size="lg" weight={"bold"}>
            {t("voca.description")}{" "}
            <CustomText color={AppTheme.color.error}>*</CustomText>
          </CustomText>
        </CustomCol>
        <CustomCol
          span={ResoulutionReturner(windowWidth, 12, 24, 24, 24)}
          className="margin-top-05"
        >
          <CustomTextArea placeholder={t("suport.skip") || ""}></CustomTextArea>
        </CustomCol>
      </CustomRow>
      <CustomRow className="margin-top-2">
        <CustomCol span={24}>
          <CustomText size="lg" weight={"bold"}>
            {t("voca.file")}
          </CustomText>
        </CustomCol>
        <CustomCol
          span={ResoulutionReturner(windowWidth, 12, 24, 24, 24)}
          className="margin-top-05"
        >
          <CustomUploader
            width={"100%"}
            list_position="left"
            file_size={10}
            size_unit="MB"
          ></CustomUploader>
        </CustomCol>
      </CustomRow>
      <CustomRow className="margin-top-5">
        <CustomCol span={24}>
          <CustomText size="lg" weight={"bold"}>
            {t("suport.notice")}
          </CustomText>
        </CustomCol>
        <CustomCol
          span={ResoulutionReturner(windowWidth, 20, 24, 24, 24)}
          className="margin-top-1"
        >
          <div
            style={{ height: "10rem", overflowY: "auto" }}
            className="customized-scrollbar "
          >
            <CustomText>{t("suport.detail")}</CustomText>
          </div>
        </CustomCol>
      </CustomRow>
      <CustomRow className="margin-top-3">
        <CustomCheckBox>{t("suport.statement")}</CustomCheckBox>
      </CustomRow>
      <CustomRow className="margin-top-3 gap-1">
        <CustomButton size="large">
          <CustomText size="sm" weight={"bold"} color={AppTheme.color.white}>
            {t("suport.sub")}
          </CustomText>
        </CustomButton>
        <CustomButton style_type="secondary" size="large">
          <CustomText size="sm" weight={"bold"} color={AppTheme.color.white}>
            {t("suport.cancel")}
          </CustomText>
        </CustomButton>
      </CustomRow>
    </ResponseLayout>
  );
};
export default MainSupportPage;
