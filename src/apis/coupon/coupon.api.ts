import { AxiosError } from "axios";
import { AUTH_API } from "../config.api";
import { APICouponRegistType } from "./coupon.api.d";

export const APICouponRegist = async (register_coupon: APICouponRegistType) => {
  try {
    const response = await AUTH_API.post(
      `coupon/register-coupon`,
      register_coupon
    );
    return response;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};

export const APICouponHistory = async () => {
  try {
    const response = await AUTH_API.get(`log-coupon/used-history`);
    return response;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};
