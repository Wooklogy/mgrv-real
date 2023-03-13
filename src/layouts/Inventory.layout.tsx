/* eslint-disable react-hooks/exhaustive-deps */

import React, { PropsWithChildren } from "react";
import ResponseLayout from "./Response.layout";
import { useRouter } from "next/router";
import { Divider, Menu, message } from "antd";
import usePrincipal from "@/hooks/usePrincipal";
import { motion } from "framer-motion";
import styled from "styled-components";
import NodeSVG from "@/components/svg/Node.svg";
import CoinSVG from "@/components/svg/Coin.svg";
import DropSVG from "@/components/svg/Drop.svg";
import NftSVG from "@/components/svg/NFT.svg";
import EcosystemSVG from "@/components/svg/Ecosystem.svg";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { recoilState_Resize } from "@/recoils/states.recoil";
import { routerPath } from "@/utils/router.util";
import CustomRow from "@/components/grids/Row.grid";
import { ResoulutionReturner } from "@/styles/global.style";
import CustomCol from "@/components/grids/Col.grid";
import CustomText from "@/components/texts/Text";

interface InventoryLayoutItemProp {
  key: string;
  href?: string;
  icon?: React.ReactNode;
  label?: string;
}

const InventoryLayout: React.FC<PropsWithChildren> = (props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const windowWidth = useRecoilValue(recoilState_Resize);
  const { isError, principal } = usePrincipal();
  const [current, setCurrent] = React.useState<InventoryLayoutItemProp>();
  React.useEffect(() => {
    const currentItem = items.filter(
      (v) => v.key === router.pathname.split("/")[2]
    );
    setCurrent(currentItem[0]);
  }, [router.pathname]);
  React.useEffect(() => {
    if (!principal && isError) {
      message.warning(t("message.info.plz_login"));
      router.push(routerPath.login);
    }
  }, [principal, isError]);
  const items: InventoryLayoutItemProp[] = [
    {
      key: "wallet",
      href: `${routerPath.inven}/wallet`,
      icon: <CoinSVG width={"1.5rem"} className="margin-right-1"></CoinSVG>,
      label: "MGRV TOKEN",
    },
    {
      key: "node",
      href: `${routerPath.inven}/node`,
      icon: <NodeSVG width={"1.5rem"} className="margin-right-1"></NodeSVG>,
      label: "Founder's Node",
    },
    // {
    //     key: "nft",
    //     href: `${routerPath.inven}/nft`,
    //     icon: <NftSVG className="margin-right-1"></NftSVG>,
    //     label: "보유 NFT",
    // },
    // {
    //     key: "drop",
    //     href: `${routerPath.inven}/drop`,
    //     icon: <DropSVG className="margin-right-1"></DropSVG>,
    //     label: "보유 DROP",
    // },
    // {
    //     key: "ecosystem",
    //     href: `${routerPath.inven}/ecosystem`,
    //     icon: <EcosystemSVG className="margin-right-1"></EcosystemSVG>,
    //     label: "생태계",
    // },
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
export default InventoryLayout;

export const InventoryAnimationDiv: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <InventoryAnimationDivStyle
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      {children}
    </InventoryAnimationDivStyle>
  );
};

const InventoryAnimationDivStyle = styled(motion.div)`
  width: 100%;
  position: relative;
`;
