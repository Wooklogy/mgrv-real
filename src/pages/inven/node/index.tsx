import {
  APIMgrvChildNodeFind,
  APIMgrvNodeFind,
} from "@/apis/mgrv_node/mgrv_node";
import CustomBox from "@/components/boxs/Box.comp";
import FounderNode from "@/components/boxs/Box.node.comp";
import CustomCol from "@/components/grids/Col.grid";
import CustomRow from "@/components/grids/Row.grid";
import CustomText from "@/components/texts/Text";
import { AccountSettingAnimationDiv } from "@/layouts/AccountSetting.layout";

import InventoryLayout from "@/layouts/Inventory.layout";
import { recoilState_Resize } from "@/recoils/states.recoil";
import { ResoulutionReturner } from "@/styles/global.style";
import { Divider, Image, Popover } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const InventoryNodePage: React.FC = () => {
  const { t } = useTranslation();
  const windowWidth = useRecoilValue(recoilState_Resize);
  const myNodes = useQuery(["getMayNode"], APIMgrvNodeFind);
  const myChildNodes = useQuery(["getMayChildNode"], APIMgrvChildNodeFind);
  return (
    <InventoryLayout>
      <AccountSettingAnimationDiv>
        <CustomRow className="margin-top-1" justify={"space-between"}>
          <CustomText size="xl" style_type="primary" weight={"bold"}>
            {"Founder's Node"}
          </CustomText>
          <Popover
            arrow={false}
            // placement="bottomRight"
            overlayInnerStyle={{
              overflowY: "auto",
              maxHeight: "20rem",
            }}
            content={
              <>
                {myChildNodes.data &&
                  myChildNodes?.data?.data.map((item: any) => (
                    <CustomBox key={item.id}>
                      <CustomRow>
                        <Image
                          src="/images/sampleNode.png"
                          alt="node"
                          preview={false}
                          height={"5rem"}
                        ></Image>
                        <CustomCol
                          span={14}
                          className="flex-column justify-center"
                        >
                          <CustomRow>
                            <CustomText>{item?.hash_code}</CustomText>
                          </CustomRow>
                          <Divider style={{ margin: "0" }}></Divider>
                          <CustomRow className="flex align-end">
                            <CustomText
                              weight={"bold"}
                              class_name={"margin-right-05"}
                            >
                              {item?.nickname}
                            </CustomText>
                            <CustomText
                              size="ti"
                              hover={true}
                              clipboard_value={item?.rec_key}
                              cursor="pointer"
                            >
                              {item?.rec_key}
                            </CustomText>
                          </CustomRow>
                        </CustomCol>
                      </CustomRow>
                    </CustomBox>
                  ))}
              </>
            }
          >
            <CustomText weight={"bold"}>
              {t("node.child", {
                number:
                  (myChildNodes.data && myChildNodes.data?.data?.length) || 0,
              })}
            </CustomText>
          </Popover>
        </CustomRow>
        <OverflowBox className="margin-top-3">
          <CustomCol
            offset={ResoulutionReturner(windowWidth, 1, 1, 1, 1)}
            span={ResoulutionReturner(windowWidth, 22, 22, 22, 22)}
          >
            {myNodes?.data &&
              myNodes?.data?.data?.map((item: any, idx: number) => {
                return (
                  <FounderNode
                    key={item.id || `founderNode${idx}`}
                    id={item.id}
                    title={item.mgn_node_hashcode}
                    purchase={true}
                  ></FounderNode>
                );
              })}
            <FounderNode></FounderNode>
          </CustomCol>
        </OverflowBox>
      </AccountSettingAnimationDiv>
    </InventoryLayout>
  );
};
export default InventoryNodePage;

const OverflowBox = styled(CustomRow)`
  height: 40rem;
  overflow-y: auto;
  overflow-x: "clip";
`;
