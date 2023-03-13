import { APICouponRegistType } from "@/apis/coupon/coupon.api.d";
import { APICouponRegist } from "@/apis/coupon/coupon.api";
import usePrincipal from "@/hooks/usePrincipal";
import { AppTheme } from "@/styles/global.style";
import { message, Modal, ModalProps, Spin } from "antd";
import { useRouter } from "next/router";
import React, { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineClose } from "react-icons/ai";
import { useMutation } from "react-query";
import styled from "styled-components";
import CustomBox from "../boxs/Box.comp";
import CustomButton from "../buttons/Button";
import CustomCol from "../grids/Col.grid";
import CustomRow from "../grids/Row.grid";
import CustomInput from "../input/Input.comp";
import CustomText from "../texts/Text";
import { routerPath } from "@/utils/router.util";

export interface WoModalProps extends ModalProps {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalAirdrop: React.FC<WoModalProps> = (props) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [couponNumber, setCouponNumber] = React.useState<string>("");
  const [recNumber, setRecNumber] = React.useState<string | undefined>(
    undefined
  );
  const { refreshPrincipal } = usePrincipal();
  const { t } = useTranslation();
  const registCoupon = useMutation(APICouponRegist, {
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: (error: any) => {
      message.error(t(error.response.data.message));
    },
    onSuccess: (response: any) => {
      refreshPrincipal().then(() => {
        setCouponNumber("");
        setRecNumber("");
        message.success(
          t("message.scc.regist.coupon", { string: response.data?.name || "" })
        );
      });
    },
  });
  const handleKeyDown = (e: any) => {
    const val = String(e.target.value)
      .replace(/^(\d\w{4})(\d\w{4})(\d\w{4})$/, `$1-$2-$3`)
      .toUpperCase();

    setCouponNumber(val);
  };

  const handleKeyPress = (e: any) => {
    if (e.key == "Enter") {
      e.preventDefault();
      handleRegisterCoupon();
    }
  };
  const handleRegisterCoupon = () => {
    const couponNumberLength = couponNumber.length;

    // 쿠폰번호 유효성 검사
    if (couponNumberLength !== 14) {
      message.error(t("message.err.coupon_code"));
      return;
    }

    const dto: APICouponRegistType = {
      code: couponNumber,
      rec_key: recNumber,
    };
    registCoupon.mutate(dto);
  };

  return (
    <ModalAirdropStyle
      {...props}
      open={props?.isOpen}
      footer={null}
      centered={true}
      width={"45rem"}
      keyboard={true}
      closable={false}
    >
      <CustomBox
        border_radius={12}
        style={{ padding: "2rem 4rem", paddingBottom: "5rem" }}
        background_color={AppTheme.color.white}
        width={"45rem"}
      >
        <Spin spinning={loading}>
          <CustomText
            cursor="pointer"
            onClick={() => {
              if (props.setIsOpen) props.setIsOpen(false);
            }}
            hover={true}
            style={{
              position: "absolute",
              right: "-2rem",
              top: "-1rem",
            }}
          >
            <AiOutlineClose></AiOutlineClose>
          </CustomText>
          <CustomRow justify={"center"}>
            <CustomText weight={"bold"} size="xxxl">
              {t("profile.airdrop.title")}
            </CustomText>
          </CustomRow>
          <CustomRow className="margin-top-2">
            <CustomCol span={24}>
              <CustomText size="sm" weight={"bold"}>
                {t("airdrop.code")}
              </CustomText>
            </CustomCol>
            <CustomCol span={24}>
              <CustomInput
                value={couponNumber}
                onKeyDown={handleKeyPress}
                maxLength={14}
                onChange={handleKeyDown}
                placeholder={t("airdrop.plz_code") || ""}
              ></CustomInput>
            </CustomCol>
          </CustomRow>
          <CustomRow className="margin-top-1">
            <CustomCol span={24}>
              <CustomText size="sm" weight={"bold"}>
                {t("airdrop.rec_code")}
              </CustomText>
            </CustomCol>
            <CustomCol span={24}>
              <CustomInput
                onKeyDown={handleKeyPress}
                value={recNumber}
                onChange={(e) => {
                  setRecNumber(e.target.value);
                }}
                maxLength={6}
                placeholder={t("airdrop.plz_rec_code") || ""}
              ></CustomInput>
            </CustomCol>
          </CustomRow>
          <CustomRow className="margin-top-2">
            <CustomButton width={"100%"} onClick={handleRegisterCoupon}>
              <CustomText color={AppTheme.color.white}>
                {t("airdrop.regist")}
              </CustomText>
            </CustomButton>
          </CustomRow>
          <CustomRow className="margin-top-1">
            <CustomButton
              width={"100%"}
              style_type="secondary"
              onClick={() => {
                if (props.setIsOpen) props.setIsOpen(false);
                router.push(routerPath.account + "/airdrop");
              }}
            >
              <CustomText color={AppTheme.color.white}>
                {t("profile.airdrop")}
              </CustomText>
            </CustomButton>
          </CustomRow>
        </Spin>
      </CustomBox>
    </ModalAirdropStyle>
  );
};
const ModalAirdropStyle = styled(Modal)`
  & .ant-modal-content {
    background-color: transparent;
    box-shadow: none;
  }
  box-shadow: none;
`;

export default ModalAirdrop;
