import { Dayjs } from "dayjs";

export interface APIMgrvWalletGetMyHistoryProps {
  status?: string;
  axios_date?: string | Dayjs | Date;
  search_status?: string;
}

export interface APImgrvWalletSendCoinProps {
  send_address: string;
  recive_address: string;
  coin: number;
}
