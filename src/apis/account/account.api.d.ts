import { Dayjs } from "dayjs";

export interface APIAccountPasswordModify {
    mm_password?: string;
}
export interface APIAccountModifyProfileProps {
    birth_date?: Dayjs | Date;
    country_code?: string;
}
export interface APIAccountRegistExternalWalletProps {
    mm_wallet_address?: string;
}
export interface APIAccountModifyMgrvWalletProps {
    pin_password?: string;
}
