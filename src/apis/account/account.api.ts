import { AxiosError } from "axios";
import { AUTH_API } from "../config.api";
import {
  APIAccountModifyMgrvWalletProps,
  APIAccountModifyProfileProps,
  APIAccountRegistExternalWalletProps,
} from "./account.api.d";
export const APIAccountModifyPassword = async (info?: string) => {
  if (!info) return false;
  try {
    const getResponse = await AUTH_API.patch(`/account/modify-password`, {
      password: info,
    });

    return getResponse;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};
export const APIAccountModifyNickname = async (info?: string) => {
  if (!info) return false;
  try {
    const getResponse = await AUTH_API.patch(`/account/modify-nickname`, {
      nickname: info,
    });

    return getResponse;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};
export const APIAccountModifyProfile = async (
  info?: APIAccountModifyProfileProps
) => {
  if (!info) return false;
  try {
    const getResponse = await AUTH_API.patch(`/account/modify-profile`, info);
    return getResponse;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};

export const APIAccountRegistExternalWallet = async (
  info?: APIAccountRegistExternalWalletProps
) => {
  if (!info) return false;
  try {
    const getResponse = await AUTH_API.patch(
      `/mgrv_wallet/regist/external-wallet`,
      info
    );

    return getResponse;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};
export const APIAccountModifyMgrvWallet = async (
  info?: APIAccountModifyMgrvWalletProps
) => {
  if (!info) return false;
  try {
    const getResponse = await AUTH_API.patch(
      `/mgrv_wallet/modify/mgrv-password`,
      info
    );

    return getResponse;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};
