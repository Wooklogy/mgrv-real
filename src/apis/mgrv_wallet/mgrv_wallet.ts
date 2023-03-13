import { AUTH_API } from "../config.api";
import {
  APIMgrvWalletGetMyHistoryProps,
  APImgrvWalletSendCoinProps,
} from "./mgrv_wallet.d";

export const APIMgrvWalletGetMyHistory = async (
  dto: APIMgrvWalletGetMyHistoryProps
) => {
  try {
    const response = await AUTH_API.get(`/mgrv_wallet/history-coin`, {
      params: dto,
    });
    return response;
  } catch {
    return false;
  }
};

export const APIMgrvWalletReciveCoin = async (id: number) => {
  try {
    const response = await AUTH_API.post(`/mgrv_wallet/recive-coin`, {
      id: id,
    });
    return response;
  } catch {
    return false;
  }
};
export const APIMgrvWalletReturnCoin = async (id: number) => {
  try {
    const response = await AUTH_API.post(`/mgrv_wallet/return-coin`, {
      id: id,
    });
    return response;
  } catch {
    return false;
  }
};

export const APIMgrvWalletSendCoin = async (
  dto: APImgrvWalletSendCoinProps
) => {
  try {
    const response = await AUTH_API.post(`/mgrv_wallet/send-coin`, dto);
    return response;
  } catch (err: any) {
    return err.response.data;
  }
};
// 핀번호 체크
export const APIVerifyPinPassword = async (pin_password?: string) => {
  const result = await AUTH_API.get(`mgrv_wallet/check/pin-password`, {
    params: { pin_password: pin_password },
  });
  return result.data;
};
