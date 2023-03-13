import { AxiosError } from "axios";
import { AUTH_API } from "../config.api";
import {
  APIMgrvNodeRegistProps,
  APIMgrvNodeUnRegistProps,
} from "./mgrv_node.d";
export const APIMgrvNodeFind = async () => {
  try {
    const response = await AUTH_API.get(`/node/find`);
    return response;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};
export const APIMgrvChildNodeFind = async () => {
  try {
    const response: any = await AUTH_API.get(`/node/find-child`);
    return response;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};
export const APIMgrvParentNodeFind = async (node_code?: string) => {
  try {
    const response: any = await AUTH_API.get(`/node/find-parent`, {
      params: {
        mgn_node_hashcode: node_code,
      },
    });
    return response;
  } catch (err: any) {
    const error = err as AxiosError;
    throw error;
  }
};
export const APIMgrvNodeRegist = async (dto: APIMgrvNodeRegistProps) => {
  try {
    const response = await AUTH_API.patch(`/node/regist-node`, dto);
    return response;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};
export const APIMgrvNodeUnRegist = async (dto: APIMgrvNodeUnRegistProps) => {
  try {
    const response = await AUTH_API.delete(`/node/unregist-node`, {
      params: dto,
    });
    return response;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};
