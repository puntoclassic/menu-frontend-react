import { AppState } from "types/appTypes";
import { BehaviorSubject } from "rxjs";

import { fetchCategories, fetchSettings } from "rx/actions";

var currentAppState: AppState = {
  categories: [],
  site_name: "",
  site_subtitle: "",
  settings: {},
};

const subject = new BehaviorSubject<AppState>(currentAppState);

export const appStore = {
  init: async () => {
    await fetchCategories();
    await fetchSettings();
  },
  subscribe: (setState: any) => subject.subscribe(setState),
  push: (newState: AppState) => {
    currentAppState = newState;
    subject.next(newState);
  },
  reloadSettings: async () => {
    await fetchSettings();
  },
  getState: () => currentAppState,
};
