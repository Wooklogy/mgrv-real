import CustomButton from "@/components/buttons/Button";
import CustomCol from "@/components/grids/Col.grid";
import CustomRow from "@/components/grids/Row.grid";
import CustomText from "@/components/texts/Text";
import usePrincipal from "@/hooks/usePrincipal";
import AccountSettingLayout from "@/layouts/AccountSetting.layout";
import { AppTheme } from "@/styles/global.style";
import { routerPath } from "@/utils/router.util";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const SecurityPage: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { principal } = usePrincipal();

  return (
    <AccountSettingLayout>
      <CustomRow className="margin-top-2">
        <CustomCol span={24}>
          <CustomText size="lg" weight={"bold"}>
            {t("profile.pin")}
            {principal?.mgrv_wallet_address ? (
              <CustomText
                class_name="margin-left-1"
                size="lg"
                style_type="success"
                weight={"bold"}
              >
                {t("profile.pin.reg")}
              </CustomText>
            ) : (
              <CustomText
                class_name="margin-left-1"
                size="lg"
                style_type="error"
                weight={"bold"}
              >
                {t("profile.pin.unreg")}
              </CustomText>
            )}
          </CustomText>
        </CustomCol>
        <CustomCol span={24} className="margin-top-2">
          {principal?.mgrv_wallet_address ? (
            <CustomButton
              width={"15rem"}
              height={"3rem"}
              onClick={() => {
                router.push("security/pin-reset");
              }}
            >
              <CustomText weight={"bold"} color={AppTheme.color.white}>
                {t("profile.botton.pin")}
              </CustomText>
            </CustomButton>
          ) : (
            <CustomButton
              width={"15rem"}
              height={"3rem"}
              onClick={() => {
                router.push(routerPath.createWallet);
              }}
            >
              <CustomText weight={"bold"} color={AppTheme.color.white}>
                {t("profile.otp.reg")}
              </CustomText>
            </CustomButton>
          )}
        </CustomCol>
      </CustomRow>
      <CustomRow className="margin-top-2">
        <CustomCol span={24}>
          <CustomText size="lg" weight={"bold"}>
            {t("profile.otp")}
            {principal?.otp_scret_key ? (
              <CustomText
                class_name="margin-left-1"
                size="lg"
                style_type="success"
                weight={"bold"}
              >
                {t("profile.otp.reg")}
              </CustomText>
            ) : (
              <CustomText
                class_name="margin-left-1"
                size="lg"
                style_type="error"
                weight={"bold"}
              >
                {t("profile.otp.unreg")}
              </CustomText>
            )}
          </CustomText>
        </CustomCol>
        <CustomCol span={24} className="margin-top-2">
          {principal?.otp_scret_key ? (
            <CustomButton
              width={"15rem"}
              height={"3rem"}
              onClick={() => {
                router.push(routerPath.createWallet + "/otp3");
              }}
            >
              <CustomText weight={"bold"} color={AppTheme.color.white}>
                {t("profile.botton.otp")}
              </CustomText>
            </CustomButton>
          ) : (
            <CustomButton
              width={"15rem"}
              height={"3rem"}
              onClick={() => {
                router.push(routerPath.createWallet + "/otp1");
              }}
            >
              <CustomText weight={"bold"} color={AppTheme.color.white}>
                {t("create.otp")}
              </CustomText>
            </CustomButton>
          )}
        </CustomCol>
      </CustomRow>
    </AccountSettingLayout>
  );
};
export default SecurityPage;
