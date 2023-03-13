import { UserProps } from "@/hooks/usePrincipal";

export interface APIAuthLoginType {
    mm_identity?: string;
    mm_password?: string;
}
// 회원가입 타입
export interface APIAuthUserType
    extends Partial<
        Pick<
            UserProps,
            | "mm_name"
            | "last_name"
            | "mm_identity"
            | "mm_nickname"
            | "mgrv_wallet_address"
            | "country_code"
            | "mm_authkey"
        >
    > {
    mm_password?: string;
}
// 이메일 인증
export interface APIAuthEmailType {
    email?: string;
    code?: string;
}
