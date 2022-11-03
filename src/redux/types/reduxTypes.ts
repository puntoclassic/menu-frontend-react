export enum AccountSigninStatus {
  none,
  pending,
  failed,
  success,
}

export enum AccountVerifyStatus {
  none,
  failed,
  success,
}

export enum RequestResult {
  none,
  failed,
  success,
}

export type AccountState = {
  signinStatus: AccountSigninStatus;
  verifyAccountStatus: AccountVerifyStatus;
  pendingRequest: boolean;
  user: any;
  userLogged: any;
};

export type AppState = {
  categories: [];
  site_name: string;
  site_subtitle: string;
  settings: any;
};

export type AdminState = {
  categories: [] | null;
  requestIsPending: boolean;
  requestResult: RequestResult;
};

export type CartState = {
  items: any;
  total: number;
  tipologia_consegna: string;
  indirizzo: string;
  orario: string;
  note: string;
};

export type MessagesState = {
  info?: string;
  success?: string;
  error?: string;
};

export type RootState = {
  app: AppState;
  cart: CartState;
  messages: MessagesState;
  account: AccountState;
};
