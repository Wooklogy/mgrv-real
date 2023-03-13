import CustomRow from "@/components/grids/Row.grid";
import CustomAirdropTable from "@/components/tables/Table.Airdrop";
import CustomText from "@/components/texts/Text";
import AccountSettingLayout from "@/layouts/AccountSetting.layout";

import { useTranslation } from "react-i18next";

const AirdropHistoryPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <AccountSettingLayout>
      <CustomRow className="margin-top-5">
        <CustomText size="sm" weight={"bold"}>
          {t("profile.airdrop.list")}
        </CustomText>
      </CustomRow>
      <CustomRow className="margin-top-1">
        <CustomAirdropTable width={"100%"}></CustomAirdropTable>
      </CustomRow>
    </AccountSettingLayout>
  );
};
export default AirdropHistoryPage;
