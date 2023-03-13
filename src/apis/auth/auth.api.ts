import { AxiosError } from "axios";
import {
  AuthTokenType,
  AUTH_API,
  removeToken,
  REST_API,
  setToken,
  TokenName,
} from "../config.api";
import {
  APIAuthEmailType,
  APIAuthLoginType,
  APIAuthUserType,
} from "./auth.api.d";

export const APIAuthAccess = async () => {
  try {
    const response = await AUTH_API.get("/auth/access");
    const authToken: AuthTokenType = {
      access_token: response.headers?.access_token,
    };
    setToken(authToken);
    return response;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};
export const APIAuthLogin = async (account_info?: APIAuthLoginType) => {
  if (!account_info) return false;
  try {
    const getResponse = await REST_API.post(`account/login`, account_info);
    const authToken: AuthTokenType = {
      access_token: getResponse.headers?.access_token,
      refresh_token: getResponse.headers.refresh_token,
    };
    setToken(authToken);

    return getResponse;
  } catch (err) {
    removeToken(TokenName);

    const error = err as AxiosError;
    throw error;
  }
};

export const APIAuthCreate = async (account_info?: APIAuthUserType) => {
  if (!account_info) return false;
  try {
    const getResponse = await REST_API.post(`account`, account_info);
    return getResponse;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};

export const APICheckUniqeEmail = async (email: string) => {
  try {
    const getEmail = await REST_API.get(`account/check/email`, {
      params: {
        mm_identity: email,
      },
    });

    return getEmail;
  } catch (err) {
    return false;
  }
};
export const APICheckUniqeNickname = async (nickname: string) => {
  try {
    const getNickname = await REST_API.get(`account/check/nickname`, {
      params: {
        mm_nickname: nickname,
      },
    });

    return getNickname;
  } catch (err) {
    return false;
  }
};

// 이메일 인증 코드 보내기
export const APISendEmailCode = async (email?: string) => {
  try {
    const getAccess = await REST_API.get(`auth/email-verify`, {
      params: {
        mm_identity: email,
      },
    });
    localStorage.setItem("email_auth_key", getAccess.data);
    return true;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};

// 이메일 인증 코드 검사
export const APIVerifyEmailCode = async (dto: APIAuthEmailType) => {
  try {
    const key = localStorage.getItem("email_auth_key");
    const getAccess = await REST_API.get(`auth/email-verify-check`, {
      params: {
        email: dto.email,
        authKey: dto.code,
      },
      headers: { email_auth_key: key },
    });
    return getAccess;
  } catch (err) {
    return false;
  }
};

// 구글 OTP QR코드 받기
export const APIGetOTPQRcode = async () => {
  try {
    const getAccess = await AUTH_API.get(`auth/OTP/QRcode`);
    return getAccess;
  } catch (err) {
    return false;
  }
};
// 구글 OTP QR코드 인증
export const APIVerifyOTPQRcode = async (code?: string) => {
  try {
    await AUTH_API.get(`auth/OTP/verify`, {
      params: { code: code },
    });
    return true;
  } catch (err) {
    return false;
  }
};
// 임시 비밀번호 보내기
export const APISendTempPwd = async (email?: string) => {
  try {
    const getAccess = await REST_API.get(`auth/new/pwd`, {
      params: {
        mm_identity: email,
      },
    });
    return getAccess.data;
  } catch (err) {
    return false;
  }
};
