/* eslint-disable react-hooks/exhaustive-deps */
import {
  APIMgrvWalletSendCoin,
  APIVerifyPinPassword,
} from "@/apis/mgrv_wallet/mgrv_wallet";
import CustomButton from "@/components/buttons/Button";
import CustomCol from "@/components/grids/Col.grid";
import CustomRow from "@/components/grids/Row.grid";
import CustomInput from "@/components/input/Input.comp";
import OTPInput from "@/components/input/OTP.input.comp";
import CustomResultWallet from "@/components/results/Result.wallet";
import CustomText from "@/components/texts/Text";
import usePrincipal from "@/hooks/usePrincipal";
import { AccountSettingAnimationDiv } from "@/layouts/AccountSetting.layout";
import InventoryLayout from "@/layouts/Inventory.layout";
import { recoilState_Resize } from "@/recoils/states.recoil";
import { AppTheme, ResoulutionReturner } from "@/styles/global.style";
import { routerPath } from "@/utils/router.util";
import { message, Spin } from "antd";
import { t } from "i18next";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { useRecoilValue } from "recoil";

interface valueProps {
  taget_wallet?: string;
  coin?: number;
  PINCompleate?: boolean;
}

interface resultValueProps {
  send_address?: string;
  target_address?: string;
}

const InventoryWalletRecivePage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const windowWidth = useRecoilValue(recoilState_Resize);
  const { principal, refreshPrincipal, isError } = usePrincipal();
  const [done, setDone] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<valueProps>();
  const [resultValue, setResultValue] = React.useState<resultValueProps>();
  const [visibleOTP, setVisibleOTP] = React.useState<boolean>(true);
  const [PINvalue, setPINvalue] = React.useState<string>();
  const [summitcode, setSummitCode] = React.useState<boolean>(false);
  const sendMgrvWalletCoin = useMutation(APIMgrvWalletSendCoin, {
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: (error: any) => {
      message.error(error.response.data.message);
    },
    onSuccess: (data) => {
      refreshPrincipal().then(() => {
        setDone(true);
        setResultValue({
          send_address: data.data.send_wallet_address,
          target_address: data.data.recive_wallet_address,
        });
      });
    },
  });
  useQuery(["verifyOTPcode"], () => APIVerifyPinPassword(PINvalue), {
    onError: (error: any) => {
      message.error(t("create.erroe"));
    },
    onSuccess: (data) => {
      setValue((prev) => ({ ...prev, PINCompleate: true }));
      setVisibleOTP(false);
      message.success(t("create.cpw"));
    },
    enabled: !!summitcode,
  });
  React.useEffect(() => {
    if (principal && !principal?.mgrv_wallet_address && !isError) {
      message.warning(t("message.error.null_mgrove_wallet"));
      router.push(routerPath.createWallet);
    }
  }, [principal]);

  const handleTargetWallet: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setValue((prev) => ({ ...prev, taget_wallet: e.target.value }));
  };

  const handleCoin: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const coin = Math.min(
      principal?.mm_coin_balance || 0,
      Number(e.target.value)
    );
    setValue((prev) => ({ ...prev, coin: coin }));
  };

  const handleSummit = () => {
    if (!value?.coin) {
      message.info(t("message.info.wrtie_amount"));
    } else if (!value?.PINCompleate) {
      setVisibleOTP(true);
      message.info(t("message.info.confirm_pin"));
      router.push("#OTP");
    } else {
      if (
        window.confirm(
          t("message.confirm.mgrv.coin.send", {
            target: value.taget_wallet,
            number: value.coin?.toLocaleString(),
          }) || ""
        )
      ) {
        sendMgrvWalletCoin.mutate({
          coin: value.coin || 0,
          recive_address: value.taget_wallet || "",
          send_address: principal?.mgrv_wallet_address || "",
        });
      }
    }
  };

  const handleOTPKeyDown = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.code === "Enter") {
      e.preventDefault();
      setSummitCode(true);
    }
  };

  const handleKeyDown = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.code === "Enter") {
      e.preventDefault();
      handleSummit();
    }
  };

  return (
    <InventoryLayout>
      <AccountSettingAnimationDiv>
        {done ? (
          <CustomRow width={"70%"} className="margin-top-3">
            <CustomResultWallet
              setBack={setDone}
              send_address={resultValue?.send_address}
              target_address={resultValue?.target_address}
            ></CustomResultWallet>
          </CustomRow>
        ) : (
          <>
            <Spin spinning={loading}>
              <CustomRow className="margin-top-3 ">
                <CustomCol span={24}>
                  <CustomText style_type="primary" size="xxxl" weight={"bold"}>
                    {t("wallet.insend")}
                  </CustomText>
                </CustomCol>
                <CustomCol span={24} className="margin-top-05">
                  <CustomText weight={600} color={AppTheme.color.error}>
                    {t("wallet.in.subtext")}
                  </CustomText>
                </CustomCol>
                <CustomCol span={24}>
                  <CustomText weight={600}>
                    {t("wallet.in.subtext2")}
                  </CustomText>
                </CustomCol>
                <CustomCol span={24}>
                  <CustomText weight={600}>
                    {t("wallet.in.subtext3")}
                  </CustomText>
                </CustomCol>
              </CustomRow>
              <CustomRow className="margin-top-3">
                <CustomCol span={24}>
                  <CustomText weight={"bold"} size={"xl"}>
                    {t("wallet.out.metamask")}
                  </CustomText>
                </CustomCol>
                <CustomCol
                  span={ResoulutionReturner(windowWidth, 14, 24, 24, 24)}
                  className="margin-top-1"
                >
                  <CustomInput
                    placeholder={t("wallet.out.metamask") || ""}
                    value={value?.taget_wallet}
                    onChange={handleTargetWallet}
                    onKeyDown={handleKeyDown}
                  ></CustomInput>
                </CustomCol>
                <CustomCol span={24} className="margin-top-2">
                  <CustomText weight={"bold"} size={"xl"}>
                    {t("wallet.out.amount")}
                  </CustomText>
                </CustomCol>
                <CustomCol
                  span={ResoulutionReturner(windowWidth, 14, 24, 24, 24)}
                  className="margin-top-1"
                >
                  <CustomInput
                    type="number"
                    min={0}
                    value={value?.coin}
                    max={Number(principal?.mm_coin_balance) || 0}
                    onKeyDown={handleKeyDown}
                    placeholder={t("wallet.out.eamount") || ""}
                    onChange={handleCoin}
                  ></CustomInput>
                </CustomCol>

                {visibleOTP && (
                  <>
                    <CustomCol span={24} className="margin-top-3">
                      <CustomText
                        weight={"bold"}
                        style_type="primary"
                        size="xl"
                      >
                        {t("wallet.in.pin")}
                      </CustomText>
                    </CustomCol>
                    <CustomCol span={24} className="margin-top-05">
                      <CustomText
                        weight={600}
                        color={AppTheme.color.text_second}
                      >
                        {t("wallet.in.pin1")}
                      </CustomText>
                    </CustomCol>
                    <CustomCol
                      span={ResoulutionReturner(windowWidth, 14, 24, 24, 24)}
                      className="margin-top-2"
                      height={"6rem"}
                      id={"OTP"}
                    >
                      <OTPInput
                        type={"password"}
                        onCustomChange={setPINvalue}
                        maxcount={6}
                        width={"100%"}
                        onCustomKeyDown={handleOTPKeyDown}
                        gap={"1rem"}
                        font_size={"2rem"}
                        height={ResoulutionReturner(
                          windowWidth,
                          "4.5rem",
                          "10vw",
                          "10vw",
                          "10vw"
                        )}
                      />
                    </CustomCol>
                    <CustomCol
                      span={ResoulutionReturner(windowWidth, 14, 24, 24, 24)}
                      className="margin-top-2 flex justify-end"
                    >
                      <CustomButton
                        width={"10rem"}
                        height={"3.0rem"}
                        onClick={() => {
                          setSummitCode(!summitcode);
                        }}
                        style_type="secondary"
                      >
                        <CustomText weight={"bold"} size="sm">
                          {t("create.confirm")}
                        </CustomText>
                      </CustomButton>
                    </CustomCol>
                  </>
                )}
                {value?.PINCompleate && (
                  <CustomCol span={24} className="margin-top-3">
                    <CustomText weight={"bold"} style_type="success" size="sm">
                      ✅ PIN {t("message.scc.auth")}
                    </CustomText>
                  </CustomCol>
                )}
                <CustomRow>
                  <CustomRow className="margin-top-5">
                    <CustomCol span={24}>
                      <CustomButton
                        width={"10rem"}
                        height={"3.0rem"}
                        onClick={handleSummit}
                      >
                        <CustomText
                          color={AppTheme.color.white}
                          weight={"bold"}
                          size="sm"
                        >
                          {t("wallet.button.outsend")}
                        </CustomText>
                      </CustomButton>
                    </CustomCol>
                  </CustomRow>
                </CustomRow>
              </CustomRow>
            </Spin>
          </>
        )}
      </AccountSettingAnimationDiv>
    </InventoryLayout>
  );
};
export default InventoryWalletRecivePage;
