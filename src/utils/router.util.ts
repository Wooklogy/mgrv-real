type routePathProps = {
  root: string;
  login: string;
  signup: string;
  account: string;
  inven: string;
  createWallet: string;
};
export const routerPath: routePathProps = {
  root: "/",
  login: "/auth/signin",
  signup: "/auth/signup",
  account: "/account",
  inven: "/inven",
  createWallet: "/inven/wallet/create",
};
