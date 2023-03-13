import { APIAccountRegistExternalWallet } from "@/apis/account/account.api";
import {
  APIMgrvWalletGetMyHistory,
  APIMgrvWalletReciveCoin,
  APIMgrvWalletReturnCoin,
} from "@/apis/mgrv_wallet/mgrv_wallet";
import CustomButton from "@/components/buttons/Button";
import CustomCol from "@/components/grids/Col.grid";
import CustomRow from "@/components/grids/Row.grid";
import CustomInput from "@/components/input/Input.comp";
import CustomSelectHeader from "@/components/selects/Select.header";
import CustomCopySVG from "@/components/svg/Clipboard.svg";
import CustomTable from "@/components/tables/Table.comp";
import CustomText from "@/components/texts/Text";
import usePrincipal from "@/hooks/usePrincipal";
import { AccountSettingAnimationDiv } from "@/layouts/AccountSetting.layout";
import InventoryLayout from "@/layouts/Inventory.layout";
import { recoilState_Resize } from "@/recoils/states.recoil";
import { AppTheme, ResoulutionReturner } from "@/styles/global.style";
import { routerPath } from "@/utils/router.util";
import { message, Radio, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useRecoilValue } from "recoil";

interface DataType {
  key: string;
  value: number;
  date: Date | Dayjs;
  status: string;
}

const InventoryWalletPage: React.FC = () => {
  const router = useRouter();
  const windowWidth = useRecoilValue(recoilState_Resize);
  const { t } = useTranslation();
  const [externalWallet, setExternalWallet] = React.useState<string>();
  const { principal, refreshPrincipal } = usePrincipal();
  const [radio, setRadio] = React.useState<string>();
  const [select, setSelect] = React.useState<string>();
  //   코인받기
  const ReciveCoin = useMutation(APIMgrvWalletReciveCoin, {
    onSettled: () => {
      GetTraidHistory.refetch();
      refreshPrincipal();
    },
    onError: (error: any) => {
      message.error(t(error.response.data.message));
    },
    onSuccess: () => {
      message.success(t("message.scc.recive_coin"));
      refreshPrincipal();
    },
  });
  //   돌려주기
  const ReturnCoin = useMutation(APIMgrvWalletReturnCoin, {
    onSettled: () => {
      GetTraidHistory.refetch();
      refreshPrincipal();
    },
    onError: (error: any) => {
      message.error(t(error.response.data.message));
    },
    onSuccess: () => {
      message.success(t("message.scc.return_coin"));
    },
  });
  //   외부지갑 주소 등록
  const RestRegistedExternalWallet = useMutation(
    APIAccountRegistExternalWallet,
    {
      onSettled: () => {
        refreshPrincipal();
      },
      onError: () => {
        message.error(t("message.error.regist_external_wallet"));
      },
      onSuccess() {
        message.success(t("message.scc.regist_external_wallet"));
      },
    }
  );
  //   전송내역 가져오기
  const GetTraidHistory = useQuery(["getTraideHistory", radio, select], () =>
    APIMgrvWalletGetMyHistory({
      axios_date: dayjs().subtract(Number(select), "day"),
      search_status: radio,
    })
  );

  React.useEffect(() => {
    setExternalWallet(principal?.mm_wallet_address);
  }, [principal?.mm_wallet_address]);
  const handleRegistExternalWallet = () => {
    RestRegistedExternalWallet.mutate({
      mm_wallet_address: externalWallet,
    });
  };
  const handleChangeExternalWallet:
    | React.ChangeEventHandler<HTMLInputElement>
    | undefined = (e) => {
    setExternalWallet(e.target.value);
  };
  const handleCreateMgrvWallet = () => {
    router.push(routerPath.inven + "/wallet/create");
  };
  const columns: ColumnsType<DataType> = [
    {
      title: t("wallet.out.amount"),
      dataIndex: "coin",
      key: "coin",
      align: "center",
      showSorterTooltip: false,
      render: (value: any) => {
        return (
          <CustomText class_name="flex justify-center">{value}</CustomText>
        );
      },
      sorter: (a, b) => a.value - b.value,
    },
    {
      title: t("profile.airdrop.date"),
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      showSorterTooltip: false,
      sorter: (a: any, b: any) => {
        return dayjs(a.created_at).unix() - dayjs(b.created_at).unix();
      },

      render: (value: any) => {
        return (
          <CustomText class_name="flex justify-center">
            {dayjs(value).format("YYYY-MM-DD hh:mm")}
          </CustomText>
        );
      },
    },
    {
      title: t("wallet.status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      showSorterTooltip: false,
      render: (value: any, record: any) => {
        return value == "WAIT" &&
          record.recive_wallet_address === principal?.mgrv_wallet_address ? (
          <CustomRow>
            <CustomCol span={12}>
              <CustomButton onClick={() => handleRecive(record?.id || 0)}>
                <CustomText color={AppTheme.color.white} weight={"bold"}>
                  {t("wallet.recive")}
                </CustomText>
              </CustomButton>
            </CustomCol>
            <CustomCol span={12}>
              <CustomButton
                style_type="secondary"
                onClick={() => handleReturn(record?.id || 0)}
              >
                <CustomText weight={"bold"}>
                  {t("button.coin.return")}
                </CustomText>
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
    if (window.confirm(t("message.confirm.coin.recive") || "")) {
      ReciveCoin.mutate(id);
    }
  };
  const handleReturn = (id: number) => {
    if (window.confirm(t("message.confirm.coin.return") || "")) {
      ReturnCoin.mutate(id);
    }
  };
  return (
    <InventoryLayout>
      <AccountSettingAnimationDiv>
        <CustomRow className="margin-top-2">
          <CustomCol span={24}>
            <CustomText size="sm" weight={"bold"}>
              {t("external_wallet.my")}
            </CustomText>
          </CustomCol>
          <CustomRow className="margin-top-1">
            {principal?.mm_wallet_address ? (
              <>
                <CustomCol
                  span={ResoulutionReturner(windowWidth, 12, 18, 18, 24)}
                >
                  <CustomInput
                    onChange={handleChangeExternalWallet}
                    suffix={
                      <CustomCopySVG
                        height={"100%"}
                        value={principal?.mm_wallet_address}
                      ></CustomCopySVG>
                    }
                    value={externalWallet}
                  ></CustomInput>
                </CustomCol>
                <CustomCol
                  span={ResoulutionReturner(windowWidth, 12, 5, 5, 24)}
                  className={ResoulutionReturner(
                    windowWidth,
                    "margin-left-05",
                    "margin-left-05",
                    "margin-left-05",
                    "margin-top-1"
                  )}
                >
                  <CustomButton
                    width={"100%"}
                    onClick={handleRegistExternalWallet}
                  >
                    <CustomText weight={"bold"} color={AppTheme.color.white}>
                      {t("voca.modify")}
                    </CustomText>
                  </CustomButton>
                </CustomCol>
              </>
            ) : (
              <>
                <CustomCol
                  span={ResoulutionReturner(windowWidth, 12, 17, 17, 24)}
                >
                  <CustomInput
                    value={externalWallet}
                    onChange={handleChangeExternalWallet}
                    placeholder={t("external_wallet.my.placehoder") || ""}
                  ></CustomInput>
                </CustomCol>
                <CustomCol
                  span={ResoulutionReturner(windowWidth, 6, 6, 6, 24)}
                  className={ResoulutionReturner(
                    windowWidth,
                    "margin-left-05",
                    "margin-left-05",
                    "margin-left-05",
                    "margin-top-1"
                  )}
                >
                  <CustomButton
                    width={"100%"}
                    onClick={handleRegistExternalWallet}
                  >
                    <CustomText weight={"bold"} color={AppTheme.color.white}>
                      {t("voca.register")}
                    </CustomText>
                  </CustomButton>
                </CustomCol>
              </>
            )}
          </CustomRow>
        </CustomRow>
        <CustomRow className="margin-top-2">
          <CustomCol span={24}>
            <CustomText size="sm" weight={"bold"}>
              {t("voca.mgrove_wallet")}
            </CustomText>
          </CustomCol>
          <CustomRow className="margin-top-05">
            {principal?.mgrv_wallet_address ? (
              <>
                <CustomText
                  underline={true}
                  hover={true}
                  cursor="pointer"
                  clipboard_value={principal?.mgrv_wallet_address}
                >
                  {principal?.mgrv_wallet_address}
                  <CustomCopySVG
                    value={principal?.mgrv_wallet_address}
                  ></CustomCopySVG>
                </CustomText>
              </>
            ) : (
              <>
                <CustomText
                  color={AppTheme.color.error}
                  underline={true}
                  cursor="pointer"
                  onClick={handleCreateMgrvWallet}
                >
                  {t("message.err.wallet.unfind_wallet")}
                </CustomText>
                <CustomCol span={5} className="margin-left-05">
                  <CustomButton width={"100%"} onClick={handleCreateMgrvWallet}>
                    <CustomText weight={"bold"} color={AppTheme.color.white}>
                      {t("voca.create")}
                    </CustomText>
                  </CustomButton>
                </CustomCol>
              </>
            )}
          </CustomRow>
        </CustomRow>
        <CustomRow className="margin-top-2">
          <CustomCol span={24}>
            <CustomText size="lg" style_type="primary" weight={"bold"}>
              {t("wallet.token")}
            </CustomText>
          </CustomCol>
          <CustomCol span={24} className="margin-top-05">
            <CustomText size="xl" weight={"bold"}>
              {Number(principal?.mm_coin_balance).toLocaleString() + " "}
              MGRV
            </CustomText>
          </CustomCol>
          <CustomRow className="margin-top-1 margin-bottom-3 gap-1">
            <CustomButton
              onClick={() => {
                router.push("wallet/send");
              }}
            >
              <CustomText weight={500} color={AppTheme.color.white}>
                {t("wallet.button.send")}
              </CustomText>
            </CustomButton>
            {/* <CustomButton
                            onClick={() => {
                                router.push("wallet/recive");
                            }}
                        >
                            <CustomText
                                weight={"bold"}
                                color={AppStyle.white_color}
                            >
                                받기
                            </CustomText>
                        </CustomButton> */}
          </CustomRow>
          <CustomSelectHeader
            getDate={setSelect}
            getValue={setRadio}
            title={t("wallet.history") || ""}
          />
          <CustomRow className="margin-top-05">
            <CustomTable
              rowKey={"id"}
              pagination={{ pageSize: 5 }}
              loading={GetTraidHistory.isLoading}
              columns={columns}
              dataSource={GetTraidHistory.data && GetTraidHistory?.data?.data}
              width={"100%"}
            ></CustomTable>
          </CustomRow>
        </CustomRow>
      </AccountSettingAnimationDiv>
    </InventoryLayout>
  );
};
export default InventoryWalletPage;
