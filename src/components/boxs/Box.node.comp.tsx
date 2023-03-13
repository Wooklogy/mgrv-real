import {
  APIMgrvNodeRegist,
  APIMgrvNodeUnRegist,
  APIMgrvParentNodeFind,
} from "@/apis/mgrv_node/mgrv_node";
import { recoilState_Resize } from "@/recoils/states.recoil";
import { AppTheme, ResoulutionReturner } from "@/styles/global.style";
import { Divider, Image, message, Popover, Spin } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineClose } from "react-icons/ai";
import { useMutation, useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import CustomButton from "../buttons/Button";
import CustomCol from "../grids/Col.grid";
import CustomRow from "../grids/Row.grid";
import CustomInput from "../input/Input.comp";

import CustomCopySVG from "../svg/Clipboard.svg";
import CustomText from "../texts/Text";

import CustomBox, { CustomBoxProps } from "./Box.comp";

export interface FounderNodeProps extends CustomBoxProps {
  id?: number;
  title?: string;
  price?: number;
  current_price?: number;
  is_mining?: boolean;
  total_mine?: number | string;
  rec?: string;
  child_rec?: string[];
  purchase?: boolean;
}

interface ParentProps {
  mm_nickname?: string;
  mm_rec_key?: string;
}

const FounderNode: React.FC<FounderNodeProps> = (props) => {
  const { t } = useTranslation();
  const windowWidth = useRecoilValue(recoilState_Resize);
  const [rec, setRec] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const getFindParent = useQuery(
    ["getParentNode"],
    () => APIMgrvParentNodeFind(props.title),
    {
      onSuccess: (data) => {
        setParentAccount(data.data);
      },
    }
  );
  const [parentAccount, setParentAccount] = React.useState<ParentProps>(
    getFindParent?.data?.data
  );
  const registNode = useMutation(APIMgrvNodeRegist, {
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
      getFindParent.refetch();
    },
    onError: (error: any) => {
      message.error(t(error?.response?.data?.message));
    },
    onSuccess: () => {
      message.success(t("node.regist.rec"));
    },
  });

  const unRegistNode = useMutation(APIMgrvNodeUnRegist, {
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
      getFindParent.refetch();
    },
    onError: (error: any) => {
      message.error(t(error?.response?.data?.message));
    },
    onSuccess: () => {
      setParentAccount({
        mm_nickname: undefined,
        mm_rec_key: undefined,
      });
      message.success(t("node.unregist.rec"));
    },
  });

  const handleRegistRecNode = () => {
    registNode.mutate({
      mgn_node_hashcode: props.title,
      rec_key: parentAccount.mm_rec_key,
    });
  };

  const handleUnRegistRecNode = () => {
    unRegistNode.mutate({
      mgn_node_hashcode: props.title,
    });
  };

  return (
    <Spin spinning={loading}>
      {props.purchase ? (
        <>
          <FounderNodeStyle>
            {!rec ? (
              <CustomRow gutter={[16, 0]}>
                <CustomCol span={5} offset={1}>
                  <Image
                    src="/images/sampleNode.png"
                    alt="node"
                    preview={false}
                    width={"100%"}
                  ></Image>
                </CustomCol>
                <CustomCol
                  span={17}
                  offset={1}
                  style={{ padding: "1.25rem 0" }}
                >
                  <CustomRow>
                    <CustomText
                      clipboard_value={props.title}
                      cursor="pointer"
                      hover={true}
                      weight={700}
                      size={ResoulutionReturner(
                        windowWidth,
                        "lg",
                        "lg",
                        "de",
                        "de"
                      )}
                      text_overflow={true}
                    >
                      {props.title || "5b3551d1-81fb-45dc-8d27-0c162c7f17eb"}
                      <CustomCopySVG value={props.title}></CustomCopySVG>
                    </CustomText>
                  </CustomRow>
                  {/* <CustomRow className="margin-top-1">
                    <CustomCol span={4}>
                      <CustomText weight={700}>
                        {t("node.purchase.price")}
                      </CustomText>
                    </CustomCol>
                    <CustomText weight={700}>{"16.12"}ETH</CustomText>
                    <CustomText
                      class_name="margin-left-05"
                      color={AppStyle.text.color.secondarly}
                      size={"ti"}
                      weight={500}
                    >
                      {props.price || 41151.51}USD
                    </CustomText>
                  </CustomRow>
                  <CustomRow className="margin-top-05">
                    <CustomCol span={4}>
                      <CustomText weight={700}>
                        {t("node.current.price")}
                      </CustomText>
                    </CustomCol>
                    <CustomText weight={700}>{"52.12"}ETH</CustomText>
                    <CustomText
                      class_name="margin-left-05"
                      size={"ti"}
                      color={AppStyle.text.color.secondarly}
                      weight={500}
                    >
                      {props.current_price || 41151.51}USD
                    </CustomText>
                  </CustomRow> */}
                  <CustomRow className="margin-top-2">
                    <CustomCol className="margin-right-1">
                      <CustomText
                        weight={700}
                        size={ResoulutionReturner(
                          windowWidth,
                          "de",
                          "de",
                          "ti",
                          "ti"
                        )}
                      >
                        {t("node.today.mine")}
                      </CustomText>
                    </CustomCol>
                    {props.is_mining ? (
                      <CustomText
                        color={AppTheme.color.success}
                        weight={700}
                        size={ResoulutionReturner(
                          windowWidth,
                          "de",
                          "de",
                          "ti",
                          "ti"
                        )}
                      >
                        SUCCESS
                      </CustomText>
                    ) : (
                      <CustomText
                        color={AppTheme.color.error}
                        weight={700}
                        size={ResoulutionReturner(
                          windowWidth,
                          "de",
                          "de",
                          "ti",
                          "ti"
                        )}
                      >
                        FAIL
                      </CustomText>
                    )}
                  </CustomRow>
                  <CustomRow className="margin-top-05">
                    <CustomCol className="margin-right-1">
                      <CustomText
                        weight={700}
                        size={ResoulutionReturner(
                          windowWidth,
                          "de",
                          "de",
                          "ti",
                          "ti"
                        )}
                      >
                        {t("node.total.min")}
                      </CustomText>
                    </CustomCol>
                    <CustomText
                      weight={700}
                      size={ResoulutionReturner(
                        windowWidth,
                        "de",
                        "de",
                        "ti",
                        "ti"
                      )}
                    >
                      {Number(props.total_mine || 0).toLocaleString()}
                    </CustomText>
                  </CustomRow>
                  <CustomRow className="margin-top-05 flex justify-end gap-1">
                    <CustomButton
                      width={ResoulutionReturner(
                        windowWidth,
                        "7.5rem",
                        "7.5rem",
                        "7.5rem",
                        "5.5rem"
                      )}
                      height={ResoulutionReturner(
                        windowWidth,
                        "2.5rem",
                        "2.5rem",
                        "2.5rem",
                        "2rem"
                      )}
                      onClick={() => {
                        setRec(true);
                      }}
                    >
                      <CustomText
                        size={ResoulutionReturner(
                          windowWidth,
                          "dee",
                          "dee",
                          "ti",
                          "ti"
                        )}
                        color={AppTheme.color.white}
                      >
                        {t("node.manage.rec")}
                      </CustomText>
                    </CustomButton>
                    <CustomButton
                      width={ResoulutionReturner(
                        windowWidth,
                        "7.5rem",
                        "7.5rem",
                        "7.5rem",
                        "5.5rem"
                      )}
                      height={ResoulutionReturner(
                        windowWidth,
                        "2.5rem",
                        "2.5rem",
                        "2.5rem",
                        "2rem"
                      )}
                      onClick={() => {
                        message.info("comming soon");
                      }}
                    >
                      <CustomText
                        size={ResoulutionReturner(
                          windowWidth,
                          "dee",
                          "dee",
                          "ti",
                          "ti"
                        )}
                        color={AppTheme.color.white}
                      >
                        {t("node.view_detail")}
                      </CustomText>
                    </CustomButton>
                  </CustomRow>
                </CustomCol>
              </CustomRow>
            ) : (
              <CustomRow style={{ padding: "2rem" }}>
                <CustomText
                  hover={true}
                  onClick={() => {
                    setRec(false);
                  }}
                  cursor="pointer"
                  style={{
                    zIndex: 10,
                    position: "absolute",
                    right: "1rem",
                    top: "1rem",
                  }}
                >
                  <AiOutlineClose />
                </CustomText>
                <CustomCol offset={1} span={23}>
                  <CustomText weight={"bold"} size="sm">
                    {t("node.my_rec")}
                  </CustomText>
                </CustomCol>
                <CustomRow gutter={[16, 0]} className="margin-top-1">
                  <CustomCol offset={1} span={12}>
                    <CustomInput
                      placeholder={t("node.my_rec") || ""}
                      disabled={getFindParent?.data?.data?.mm_rec_key}
                      maxLength={6}
                      value={parentAccount?.mm_rec_key}
                      onChange={(e) => {
                        setParentAccount((prev) => ({
                          ...prev,
                          mm_rec_key: e.target.value,
                        }));
                      }}
                    ></CustomInput>
                  </CustomCol>
                  {getFindParent?.data?.data?.mm_rec_key ? (
                    <CustomButton onClick={handleUnRegistRecNode}>
                      <CustomText color={AppTheme.color.white}>
                        {t("voca.release")}
                      </CustomText>
                    </CustomButton>
                  ) : (
                    <CustomButton onClick={handleRegistRecNode}>
                      <CustomText color={AppTheme.color.white}>
                        {t("voca.register")}
                      </CustomText>
                    </CustomButton>
                  )}
                </CustomRow>
                <CustomRow className="margin-top-05">
                  <CustomCol offset={1} span={23}>
                    <CustomText weight={"bold"} size="ti">
                      {parentAccount?.mm_nickname}
                    </CustomText>
                  </CustomCol>
                </CustomRow>
              </CustomRow>
            )}
          </FounderNodeStyle>
        </>
      ) : (
        <>
          {/* 노드 구매 유도 */}
          <FounderNodeStyle style={{ padding: "2rem 0", position: "relative" }}>
            <CustomRow gutter={[16, 0]} style={{ opacity: 0.5 }}>
              {/* <CustomCol span={5} offset={1}>
                <Image
                  src="/images/sampleNode.png"
                  alt="node"
                  preview={false}
                  width={"100%"}
                ></Image>
              </CustomCol> */}

              <CustomCol
                span={23}
                offset={1}
                className="flex-column justify-center align-center"
                style={{ padding: "1.25rem 0" }}
              >
                <CustomRow className="flex justify-center">
                  <CustomText
                    style={{ textAlign: "center" }}
                    size={ResoulutionReturner(
                      windowWidth,
                      "xl",
                      "lg",
                      "lg",
                      "de"
                    )}
                    weight={"bold"}
                  >
                    {t("node.err.not_find_node")}
                  </CustomText>
                </CustomRow>
                <CustomRow className="flex justify-center margin-top-1">
                  <CustomText
                    size={ResoulutionReturner(
                      windowWidth,
                      "sm",
                      "sm",
                      "sm",
                      "de"
                    )}
                  >
                    {t("node.info.click.node_shop")}
                  </CustomText>
                </CustomRow>
              </CustomCol>
            </CustomRow>
          </FounderNodeStyle>
        </>
      )}
    </Spin>
  );
};

export default FounderNode;

const FounderNodeStyle = styled(CustomBox)`
  background: ${AppTheme.color.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding-top: 1rem;
  height: auto;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  :hover {
    box-shadow: 0px 4px 4px ${AppTheme.color.primary_alpha};
  }
`;
