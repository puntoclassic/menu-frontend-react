import {
  AccountSigninStatus,
  AccountState,
  AccountVerifyStatus,
} from "../types/reduxTypes";

const { createSlice } = require("@reduxjs/toolkit");

var initialState: AccountState = {
  user: null,
  signinStatus: AccountSigninStatus.none,
  verifyAccountStatus: AccountVerifyStatus.none,
  pendingRequest: false,
  userLogged: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    updateVerificationStatus: (state: any, action: any) => {
      state.verificationStatus = action.payload.status;
    },
    updateSigninStatus: (state: any, action: any) => {
      state.signinStatus = action.payload.status;
    },
    updateUser: (state: any, action: any) => {
      state.user = action.payload.user;
    },
    updatePending: (state: any, action: any) => {
      state.pendingRequest = action.payload;
    },
    updateUserLogged: (state: any, action: any) => {
      state.userLogged = action.payload;
    },
  },
});

const { actions, reducer } = accountSlice;

export const {
  updateUser,
  updateSigninStatus,
  updateVerificationStatus,
  updatePending,
  updateUserLogged,
} = actions;

export default reducer;
