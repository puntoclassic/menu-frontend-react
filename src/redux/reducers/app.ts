import { AppState } from "../types/reduxTypes";

const { createSlice } = require("@reduxjs/toolkit");

var initialState: AppState = {
  categories: [],
  site_name: "",
  site_subtitle: "",
  settings: {},
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    pushCategories: (state: any, action: any) => {
      state.categories = action.payload.categories;
    },
    pushSiteName: (state: any, action: any) => {
      state.site_name = action.payload;
    },
    pushSiteSubtitle: (state: any, action: any) => {
      state.site_subtitle = action.payload;
    },
    pushSettings: (state: any, action: any) => {
      state.settings = Object.assign(
        {},
        ...action.payload.map((x: any) => ({ [x.name]: x.value })),
      );
    },
  },
});

const { actions, reducer } = appSlice;

export const {
  pushCategories,
  pushSiteName,
  pushSiteSubtitle,
  pushSettings,
} = actions;

export default reducer;
