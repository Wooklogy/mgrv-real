import { APIAuthAccess } from "@/apis/auth/auth.api";
import React from "react";
import { useQuery } from "react-query";
export interface UserProps {
  mm_idx?: number;
  mm_identity?: string;
  mm_nickname?: string;
  mgrv_wallet_address?: string;
  mm_name?: string;
  last_name?: string;
  mm_cell?: string;
  mm_node?: number;
  mm_rec_key?: string;
  mm_coin_balance?: number;
  mm_status?: string;
  mm_create_datetime?: string;
  mm_modify_datetime?: string;
  mm_distributor?: string;
  mm_authkey?: string;
  mm_wallet_address?: string;
  phone_number?: string;
  country_code?: string;
  updated_nickname_at?: string;
  birth_date?: string;
  otp_scret_key?: string;
}
const usePrincipal = () => {
  const { data, refetch, isError, isSuccess, isRefetching } = useQuery(
    "getPrincipal",
    APIAuthAccess
  );
  const [principal, setPrincipal] = React.useState<UserProps | undefined>(
    undefined
  );
  const refreshPrincipal = refetch;
  React.useEffect(() => {
    setPrincipal(isError ? false : data && { ...data.data });
  }, [data, isError]);
  return { principal, refreshPrincipal, isError, isSuccess, isRefetching };
};
export default usePrincipal;
