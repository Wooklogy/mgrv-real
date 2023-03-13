/* eslint-disable react-hooks/exhaustive-deps */

import React, { PropsWithChildren } from "react";
import ResponseLayout from "./Response.layout";
import { useRouter } from "next/router";
import { CgProfile } from "react-icons/cg";
import { RiUserSettingsLine } from "react-icons/ri";
import { AiOutlineGift } from "react-icons/ai";
import { Divider, Menu, message } from "antd";
import usePrincipal from "@/hooks/usePrincipal";
import { motion } from "framer-motion";
import styled from "styled-components";
import { MdOutlineSecurity } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { recoilState_Resize } from "@/recoils/states.recoil";
import { routerPath } from "@/utils/router.util";
import CustomRow from "@/components/grids/Row.grid";
import { ResoulutionReturner } from "@/styles/global.style";
import CustomCol from "@/components/grids/Col.grid";
import CustomText from "@/components/texts/Text";

interface AccountSettingLayoutItemProp {
  key: string;
  href?: string;
  icon?: React.ReactNode;
  label?: string;
}

const AccountSettingLayout: React.FC<PropsWithChildren> = (props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { isError, principal } = usePrincipal();
  const [current, setCurrent] = React.useState<AccountSettingLayoutItemProp>();
  const windowWidth = useRecoilValue(recoilState_Resize);
  React.useEffect(() => {
    const currentItem = items.filter(
      (v) => v.key === router.pathname.split("/")[2]
    );
    setCurrent(currentItem[0]);
  }, [router.pathname]);
  React.useEffect(() => {
    if (!principal && isError) {
      router.push(routerPath.login);
    }
  }, [principal, isError]);
  const items: AccountSettingLayoutItemProp[] = [
    {
      key: "setting",
      href: `${routerPath.account}/setting`,
      icon: (
        <RiUserSettingsLine className="margin-right-1"></RiUserSettingsLine>
      ),
      label: t("profile.setting") || "",
    },
    {
      key: "profile",
      href: `${routerPath.account}/profile`,
      icon: <CgProfile className="margin-right-1"></CgProfile>,
      label: t("profile.profile.setting") || "",
    },
    {
      key: "airdrop",
      href: `${routerPath.account}/airdrop`,
      icon: <AiOutlineGift className="margin-right-1"></AiOutlineGift>,
      label: t("profile.airdrop") || "",
    },
    {
      key: "security",
      href: `${routerPath.account}/security`,
      icon: <MdOutlineSecurity className="margin-right-1"></MdOutlineSecurity>,
      label: t("profile.security") || "",
    },
  ];
  return (
    <ResponseLayout>
      <CustomRow className="margin-top-5">
        {ResoulutionReturner(windowWidth, true, false, false, false) ? (
          <CustomCol span={6}>
            <CustomRow className="margin-top-3">
              {items.map((item) => {
                return (
                  <CustomRow key={item.key} className="margin-top-2">
                    <CustomText
                      hover={true}
                      weight={"bold"}
                      size="xl"
                      toggle={item.key === current?.key}
                      onClick={() => {
                        router.push(item?.href || "");
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </CustomText>
                  </CustomRow>
                );
              })}
            </CustomRow>
          </CustomCol>
        ) : (
          <CustomCol span={23} offset={1}>
            <Menu
              activeKey={current?.key || ""}
              mode="horizontal"
              items={items.map((item) => ({
                onClick: () => {
                  router.push(item.href || "");
                },
                ...item,
              }))}
              className="margin-bottom-3"
            />
          </CustomCol>
        )}

        <CustomCol
          span={ResoulutionReturner(windowWidth, 17, 22, 22, 22)}
          offset={1}
        >
          <CustomRow className="margin-bottom-1">
            <CustomText size="xxl" weight={"bold"}>
              {current?.icon} {current?.label}
            </CustomText>
          </CustomRow>
          <CustomRow>
            <Divider className="margin-0"></Divider>
          </CustomRow>
          <CustomRow>{props.children}</CustomRow>
        </CustomCol>
      </CustomRow>
    </ResponseLayout>
  );
};
export default AccountSettingLayout;

export const AccountSettingAnimationDiv: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <AccountSettingAnimationDivStyle
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      {children}
    </AccountSettingAnimationDivStyle>
  );
};

const AccountSettingAnimationDivStyle = styled(motion.div)`
  width: 100%;
  position: relative;
`;
