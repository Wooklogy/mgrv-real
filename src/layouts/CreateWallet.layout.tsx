/* eslint-disable react-hooks/exhaustive-deps */
import CustomCol from "@/components/grids/Col.grid";
import CustomRow from "@/components/grids/Row.grid";
import CustomText from "@/components/texts/Text";
import usePrincipal from "@/hooks/usePrincipal";
import { recoilState_Resize } from "@/recoils/states.recoil";
import { ResoulutionReturner } from "@/styles/global.style";
import { routerPath } from "@/utils/router.util";
import { Image, message } from "antd";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { RiArrowDropRightLine } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { ResponseCenterLayout } from "./Response.layout";

export interface WalletCreateLayoutProps {
  stemp1?: boolean;
  stemp2?: boolean;
}
const CreateWalletLayout: React.FC<
  PropsWithChildren<WalletCreateLayoutProps>
> = (props) => {
  const router = useRouter();
  const windowWidth = useRecoilValue(recoilState_Resize);
  const { principal, isError } = usePrincipal();
  const { t } = useTranslation();

  React.useEffect(() => {
    if (!principal && isError) {
      message.warning(t("message.info.plz_login"));
      router.push(routerPath.login);
    }
  }, [principal, isError]);

  return (
    <ResponseCenterLayout>
      <CustomRow className="margin-top-5 margin-bottom-5">
        <CustomCol span={10}>
          <CustomRow style={!props?.stemp1 ? { opacity: 0.5 } : undefined}>
            <CustomCol span={ResoulutionReturner(windowWidth, 11, 11, 20, 20)}>
              <Image
                preview={false}
                className="border-radius-12"
                src="/images/make_wallet.jpg"
                alt={"make_wallet"}
              ></Image>
            </CustomCol>
            {ResoulutionReturner(windowWidth, true, true, false, false) && (
              <CustomCol
                span={11}
                className="flex-column justify-center margin-left-1"
              >
                <CustomText weight="bold" size={"xxl"}>
                  STEP 1
                </CustomText>
                <CustomText weight="bold" size={"lg"}>
                  {t("create.create")}
                </CustomText>
              </CustomCol>
            )}
          </CustomRow>
        </CustomCol>
        <CustomCol span={2} className="flex align-center justify-center">
          <CustomText size={"10rem"}>
            <RiArrowDropRightLine />
          </CustomText>
        </CustomCol>
        <CustomCol span={11} offset={1}>
          <CustomRow style={!props?.stemp2 ? { opacity: 0.5 } : undefined}>
            <CustomCol span={ResoulutionReturner(windowWidth, 10, 10, 18, 18)}>
              <Image
                preview={false}
                className="border-radius-12"
                src="/images/make_otp.jpg"
                alt={"make_otp"}
              ></Image>
            </CustomCol>
            {ResoulutionReturner(windowWidth, true, true, false, false) && (
              <CustomCol
                span={11}
                className="flex-column justify-center margin-left-1"
              >
                <CustomText weight="bold" size={"xxl"}>
                  STEP 2
                </CustomText>
                <CustomText weight="bold" size={"xl"}>
                  {t("create.otp")}
                </CustomText>
              </CustomCol>
            )}
          </CustomRow>
        </CustomCol>
      </CustomRow>
      {props.children}
    </ResponseCenterLayout>
  );
};
export default CreateWalletLayout;
