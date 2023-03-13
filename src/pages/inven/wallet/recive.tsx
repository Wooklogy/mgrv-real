import {
  APIMgrvWalletGetMyHistory,
  APIMgrvWalletReciveCoin,
  APIMgrvWalletReturnCoin,
} from "@/apis/mgrv_wallet/mgrv_wallet";
import CustomButton from "@/components/buttons/Button";
import CustomCol from "@/components/grids/Col.grid";
import CustomRow from "@/components/grids/Row.grid";
import CustomCopySVG from "@/components/svg/Clipboard.svg";
import CustomTable from "@/components/tables/Table.comp";
import CustomText from "@/components/texts/Text";
import usePrincipal from "@/hooks/usePrincipal";
import { AccountSettingAnimationDiv } from "@/layouts/AccountSetting.layout";
import InventoryLayout from "@/layouts/Inventory.layout";
import { AppTheme } from "@/styles/global.style";
import { message } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";

interface DataType {
  key: string;
  value: number;
  date: Date | Dayjs;
  address: string;
  status: string;
}
const InventoryWalletRecivePage: React.FC = () => {
  // 막아둠
  const router = useRouter();
  const { t } = useTranslation();
  const { principal, refreshPrincipal } = usePrincipal();
  const [reRender, setRerender] = React.useState<boolean>();
  React.useEffect(() => {
    router.back();
    if (principal && !principal?.mgrv_wallet_address) {
      message.warning("MGRV 지갑 생성 후 이용이 가능합니다.");
    }
  }, [principal]);
  //   받은 내역 가져오기
  const GetTraidHistory = useQuery(
    ["getTraideHistory", principal, reRender],
    () => APIMgrvWalletGetMyHistory({ search_status: "RECIVE" })
  );
  //   코인받기
  const ReciveCoin = useMutation(APIMgrvWalletReciveCoin, {
    onSuccess: (data) => {
      if (data) {
        message.success("성공적으로 코인을 받았습니다.");
        refreshPrincipal();
      } else {
        message.error("유효하지 않은 접근입니다.\n고객센터에 문의해주세요.");
      }
    },
  });
  //   돌려주기
  const ReturnCoin = useMutation(APIMgrvWalletReturnCoin, {
    onSuccess: (data) => {
      if (data) {
        message.success("성공적으로 코인을 돌려주었습니다.");
        setRerender(!reRender);
      } else {
        message.error("유효하지 않은 접근입니다.\n고객센터에 문의해주세요.");
      }
    },
  });
  const columns: ColumnsType<DataType> = [
    {
      title: "상대방 지갑 주소",
      dataIndex: "recive_wallet_address",
      key: "address",
      align: "center",
      render: (value: any) => {
        return (
          <CustomText class_name="flex justify-center">{value}</CustomText>
        );
      },
    },
    {
      title: "전송량",
      dataIndex: "coin",
      key: "coin",
      align: "center",
      showSorterTooltip: false,
      sorter: (a: any, b: any) => dayjs(a.date).date() - dayjs(b.date).date(),
      render: (value: any) => {
        return (
          <CustomText class_name="flex justify-center">{value}</CustomText>
        );
      },
    },
    {
      title: "전송일",
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      showSorterTooltip: false,
      sorter: (a: any, b: any) => dayjs(a.date).date() - dayjs(b.date).date(),
      render: (value: any) => {
        return (
          <CustomText class_name="flex justify-center">
            {dayjs(value).format("YYYY-MM-DD")}
          </CustomText>
        );
      },
    },
    {
      title: "상태",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (value: any, record: any) => {
        return value == "WAIT" ? (
          <CustomRow>
            <CustomCol span={12}>
              <CustomButton onClick={() => handleRecive(record?.id || 0)}>
                <CustomText color={AppTheme.color.white} weight={"bold"}>
                  {t("voca.recive")}
                </CustomText>
              </CustomButton>
            </CustomCol>
            <CustomCol span={12}>
              <CustomButton
                style_type="secondary"
                onClick={() => handleReturn(record?.id || 0)}
              >
                <CustomText weight={"bold"}> {t("voca.return")}</CustomText>
              </CustomButton>
            </CustomCol>
          </CustomRow>
        ) : (
          <CustomText class_name="flex justify-center">{value}</CustomText>
        );
      },
      width: "25%",
    },
  ];
  const handleRecive = (id: number) => {
    if (window.confirm("전송된 코인을 받으시겠습니까?")) {
      ReciveCoin.mutate(id);
    }
  };
  const handleReturn = (id: number) => {
    if (window.confirm("전송된 코인을 반환하시겠습니까?")) {
      ReturnCoin.mutate(id);
    }
  };
  return (
    <InventoryLayout>
      <AccountSettingAnimationDiv>
        <CustomRow className="margin-top-3">
          <CustomCol span={24}>
            <CustomText style_type="primary" size="xxxl" weight={"bold"}>
              받기
            </CustomText>
          </CustomCol>
          <CustomCol span={24} className="margin-top-05">
            <CustomText weight={600}>
              현재 내부 생태계 TOKEN 받기 기능만 지원합니다.
            </CustomText>
          </CustomCol>
          <CustomCol span={24}>
            <CustomText weight={600} color={AppTheme.color.error}>
              MGROVE가 지원하지 않는 자산을 수령하려고 할 때, MGROVE는 회사의
              고의 또는 과실이
            </CustomText>
          </CustomCol>
          <CustomCol span={24}>
            <CustomText weight={600} color={AppTheme.color.error}>
              없는 한 이로 발생하는 손해에 대해 책임을 지지 않습니다.
            </CustomText>
          </CustomCol>
        </CustomRow>
        <CustomRow className="margin-top-2">
          <CustomCol span={24}>
            <CustomText size="sm" weight={"bold"}>
              내부 지갑주소
            </CustomText>
          </CustomCol>
          <CustomRow className="margin-top-05">
            <CustomText
              underline={true}
              hover={true}
              cursor="pointer"
              weight={"bold"}
              size="sm"
              clipboard_value={principal?.mgrv_wallet_address}
            >
              {principal?.mgrv_wallet_address}{" "}
              <CustomCopySVG
                value={principal?.mgrv_wallet_address}
              ></CustomCopySVG>
            </CustomText>
          </CustomRow>
        </CustomRow>
        <CustomRow className="margin-top-3">
          <CustomTable
            columns={columns}
            dataSource={GetTraidHistory.data && GetTraidHistory?.data?.data}
            width={"100%"}
          ></CustomTable>
        </CustomRow>
      </AccountSettingAnimationDiv>
    </InventoryLayout>
  );
};
export default InventoryWalletRecivePage;
