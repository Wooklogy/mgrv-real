import { AppTheme } from "@/styles/global.style";
import { routerPath } from "@/utils/router.util";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { AiOutlineArrowDown, AiOutlineArrowRight } from "react-icons/ai";
import { BsChevronDoubleDown } from "react-icons/bs";
import { TbNotificationOff } from "react-icons/tb";
import styled from "styled-components";
import CustomBox from "../boxs/Box.comp";
import CustomButton from "../buttons/Button";
import CustomCol from "../grids/Col.grid";
import CustomRow from "../grids/Row.grid";
import CustomCopySVG from "../svg/Clipboard.svg";
import CustomText from "../texts/Text";

export interface CustomResultWalletProps {
  send_address?: string;
  target_address?: string;
  setBack: (val: boolean) => void;
}
const CustomResultWallet: React.FC<CustomResultWalletProps> = (props) => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <>
      <CustomRow>
        <CustomText style_type="success" size="xxl" weight={"bold"}>
          {t("wallet.result")}
        </CustomText>
      </CustomRow>
      <CustomCol span={24} className="margin-top-2">
        <BoxStyle border_radius={12} style={{ padding: "2rem" }}>
          <CustomRow className="flex-column justify-center" height={"100%"}>
            <CustomText weight={700} line_height={22}>
              {t("wallet.result.my")}
            </CustomText>
            <CustomText
              class_name="margin-top-05"
              weight={700}
              line_height={22}
              underline={true}
              hover={true}
              size="sm"
              cursor="pointer"
              clipboard_value={props.send_address}
            >
              {props.send_address || <TbNotificationOff></TbNotificationOff>}
              <CustomCopySVG value={props.target_address}></CustomCopySVG>
            </CustomText>
          </CustomRow>
        </BoxStyle>
      </CustomCol>
      <CustomRow className="flex align-center justify-center margin-top-1">
        <CustomText style_type="primary" size={"3rem"} weight={"bold"}>
          <BsChevronDoubleDown></BsChevronDoubleDown>
        </CustomText>
      </CustomRow>
      <CustomCol span={24}>
        <BoxStyle border_radius={12} style={{ padding: "2rem" }}>
          <CustomRow className="flex-column justify-center" height={"100%"}>
            <CustomText weight={700} line_height={22}>
              {t("wallet.result.metamask")}
            </CustomText>
            <CustomText
              class_name="margin-top-05"
              weight={700}
              line_height={22}
              underline={true}
              hover={true}
              size="sm"
              cursor="pointer"
              clipboard_value={props.target_address}
            >
              {props.target_address || <TbNotificationOff></TbNotificationOff>}
              <CustomCopySVG value={props.target_address}></CustomCopySVG>
            </CustomText>
          </CustomRow>
        </BoxStyle>
      </CustomCol>
      <CustomRow className="gap-1 margin-top-3">
        <CustomButton
          onClick={() => {
            router.push(routerPath.inven + "/wallet");
          }}
        >
          <CustomText weight={700} color={AppTheme.color.white}>
            {t("create.confirm")}
          </CustomText>
        </CustomButton>
        <CustomButton
          style_type="secondary"
          onClick={() => {
            props.setBack(false);
          }}
        >
          <CustomText weight={700}>{t("button.more_send")}</CustomText>
        </CustomButton>
      </CustomRow>
    </>
  );
};

export default CustomResultWallet;

const BoxStyle = styled(CustomBox)`
  box-shadow: inset 0px 0px 5px rgb(0 0 0 / 25%);
  height: 10rem;
`;
