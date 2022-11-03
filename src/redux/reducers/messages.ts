import { MessagesState } from "../types/reduxTypes";

const { createSlice } = require("@reduxjs/toolkit");

var initialState: MessagesState = {};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    resetMessages: (state: any) => {
      state.info = null;
      state.success = null;
      state.error = null;
    },
    pushMessage: (state: any, action: any) => {
      var payload = action.payload;

      const { tag, message } = payload;

      state.info = null;
      state.success = null;
      state.error = null;

      if (tag === "info") {
        state.info = message;
      }

      if (tag === "success") {
        state.success = message;
      }

      if (tag === "error") {
        state.error = message;
      }
    },
  },
});

const { actions, reducer } = messagesSlice;

export const {
  pushMessage,
  resetMessages,
} = actions;

export default reducer;
