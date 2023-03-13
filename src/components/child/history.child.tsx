import { AppTheme } from "@/styles/global.style";
import { Divider, Tabs } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineHistory } from "react-icons/ai";
import styled from "styled-components";
import CustomButton from "../buttons/Button";
import CustomCol from "../grids/Col.grid";
import CustomRow from "../grids/Row.grid";
import CustomTableAirdrop from "../tables/Table.Airdrop";
import CustomText from "../texts/Text";

interface tabType {
  key: string;
  label: string;
}
const ChildHistory: React.FC = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = React.useState<string>("drop_air");
  const Tabs: tabType[] = [
    {
      key: "drop_paly",
      label: t("history.play_drop"),
    },
    {
      key: "drop_fllow",
      label: t("history.flow_drop"),
    },
    {
      key: "drop_sales",
      label: t("history.sale_drop"),
    },
    {
      key: "drop_mining",
      label: t("history.mining_drop"),
    },
    {
      key: "drop_nft",
      label: t("history.NFT_drop"),
    },
    {
      key: "drop_air",
      label: t("history.air_drop"),
    },
  ];
  return (
    <CustomRow>
      <CustomCol span={24}>
        <CustomText size="lg" weight={"bold"}>
          <AiOutlineHistory className="margin-right-05" />
          {t("history.title")}
        </CustomText>
      </CustomCol>
      <Divider className="margin-0 margin-top-05"></Divider>
      <CustomRow>
        {Tabs.map((item) => (
          <TabStyle
            className={current == item.key ? "focus" : ""}
            key={item.key}
            size={"large"}
            style_type="line"
            radius_px={"0"}
          >
            {item.label}
          </TabStyle>
        ))}
      </CustomRow>
      <CustomRow className="margin-top-3">
        <CustomTableAirdrop width={"100%"}></CustomTableAirdrop>
      </CustomRow>
    </CustomRow>
  );
};
export default ChildHistory;

const TabStyle = styled(CustomButton)`
  &.focus {
    color: ${AppTheme.color.white};
    background-color: ${AppTheme.color.primary};
  }
  color: ${AppTheme.color.text};
  font-weight: bold;
  border-top: none;
  border-left: none;
  border-right: none;
  box-shadow: none;
  :hover {
    color: ${AppTheme.color.white};
    background-color: ${AppTheme.color.primary};
  }
`;
