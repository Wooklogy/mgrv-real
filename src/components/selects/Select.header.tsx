import { Radio, RadioChangeEvent, Select } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import CustomCol from "../grids/Col.grid";
import CustomRow from "../grids/Row.grid";
import CustomRadioBox from "../radios/Radio.comp";
import CustomText from "../texts/Text";

export interface CustomSelectHeaderProps {
  title?: string;
  getValue?: (val: string) => void;
  getDate?: (val: string) => void;
}

const CustomSelectHeader: React.FC<CustomSelectHeaderProps> = (props) => {
  const { t } = useTranslation();

  const [radioValue, setRadioValue] = React.useState<string>("ALL");

  const handleRadioChange = (val: RadioChangeEvent) => {
    setRadioValue(val.target.value);
    if (props.getValue) {
      props.getValue(val.target.value);
    }
  };

  const [selectValue, setSelectValue] = React.useState<
    string | null | undefined
  >("1");

  const handleSelectChange = (val: string) => {
    setSelectValue(String(val));
    if (props.getDate) {
      props.getDate(String(val));
    }
  };
  return (
    <CustomRow className="flex justify-between">
      <CustomCol>
        <CustomText size="lg" weight={"bold"}>
          {props?.title || ""}
        </CustomText>
      </CustomCol>
      <CustomCol>
        <CustomRow>
          <CustomCol className="flex align-center">
            <Radio.Group value={radioValue} onChange={handleRadioChange}>
              <CustomRadioBox key={"ALL"} value={"ALL"}>
                <CustomText>{t("wallet.all")}</CustomText>
              </CustomRadioBox>
              <CustomRadioBox key={"SEND"} value={"SEND"}>
                <CustomText>{t("wallet.send")}</CustomText>
              </CustomRadioBox>
              <CustomRadioBox key={"RECIVE"} value={"RECIVE"}>
                <CustomText>{t("wallet.recive")}</CustomText>
              </CustomRadioBox>
              {/* <CustomRadioBox key={"RETURN"} value={"RETURN"}>
                <CustomText>반환</CustomText>
              </CustomRadioBox> */}
            </Radio.Group>
          </CustomCol>
          <CustomCol>
            <Select
              onSelect={handleSelectChange}
              style={{ width: "10rem" }}
              value={selectValue}
              options={[
                {
                  label: t("wallet.date.last1"),
                  value: "1",
                },
                {
                  label: t("wallet.date.last7"),
                  value: "7",
                },
                {
                  label: t("wallet.date.last30"),
                  value: "30",
                },
              ]}
            ></Select>
          </CustomCol>
        </CustomRow>
      </CustomCol>
    </CustomRow>
  );
};

export default CustomSelectHeader;
