import { message } from "antd";

export class CustomErrorType extends Error {
  response?: {
    data: any;
    status: number;
    headers: string;
  };
}

export const ReactQueryBoundary = (error: unknown) => {
  const err = error as CustomErrorType;

  const status = err.response?.status;

  if (!status) return false;
  else if (status === 403) return false;
  else if (status === 502) {
    message.error("cors error!!! : try again");
    return false;
  } else if (status > 500) return true;
  return false;
};
