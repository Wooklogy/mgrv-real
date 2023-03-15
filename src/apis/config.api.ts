import axios, { AxiosRequestConfig } from "axios";
export interface AuthTokenType {
  access_token?: string;
  refresh_token?: string;
}

export const getAPIHost = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return process.env.DEV_BACK_URL;
    case "production":
      return process.env.PROD_BACK_URL;
  }
};

const axiosRestConfig: AxiosRequestConfig = {
  baseURL: getAPIHost(),
  timeout: 10000,
  timeoutErrorMessage: "Time Out Error!!!\nCheck Your Internet",
};

export const REST_API = axios.create(axiosRestConfig);

export const AUTH_API = axios.create({
  baseURL: getAPIHost(),
  withCredentials: true,
  timeout: 10000,
  timeoutErrorMessage: "Time Out Error!!!\nCheck Your Internet",
});

// request interceptor subscript
AUTH_API.interceptors.request.use((req: any) => {
  const token: AuthTokenType | null = getToken();
  if (token) {
    req.headers.access_token = token.access_token;
    req.headers.refresh_token = token.refresh_token;
  }
  return req;
});

export const TokenName = "token";

export const getToken = (): AuthTokenType | null => {
  if (typeof window === "undefined") return null;
  const item = localStorage.getItem(TokenName);
  if (item) {
    const token: AuthTokenType = JSON.parse(item);
    return token;
  }
  return null;
};

export const setToken = (token: AuthTokenType): AuthTokenType | null => {
  if (!token) return null;
  const { access_token, refresh_token } = token;
  const auth_data: AuthTokenType = {
    access_token,
    refresh_token,
  };
  localStorage.setItem(TokenName, JSON.stringify(auth_data));
  return auth_data;
};

export const removeToken = (tokenName: string) => {
  localStorage.removeItem(tokenName);
};
