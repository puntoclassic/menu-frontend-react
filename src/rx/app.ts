import { AppState } from "types/appTypes";
import { BehaviorSubject } from "rxjs";

import categoryService from "services/categoryService";
import configService from "services/configService";

var currentAppState: AppState = {
  categories: [],
  site_name: "",
  site_subtitle: "",
  settings: {},
};

const subject = new BehaviorSubject<AppState>(currentAppState);

export const appStore = {
  init: async () => {
    appStore.fetchCategories();
    appStore.fetchSettings();
  },
  subscribe: (setState: any) => subject.subscribe(setState),
  push: (newState: AppState) => {
    currentAppState = newState;
    subject.next(newState);
  },
  reloadSettings: () => {
    appStore.fetchSettings();
  },
  getState: () => currentAppState,
  fetchCategories: async () => {
    var response = await categoryService.fetchCategories();

    currentAppState = {
      ...appStore.getState(),
      categories: response.data,
    };

    subject.next(currentAppState);
  },
  fetchSettings: async () => {
    var response = await configService.getSettings();

    appStore.push({
      ...appStore.getState(),
      settings: Object.assign(
        {},
        ...response.data.map((x: any) => ({ [x.name]: x.value })),
      ),
    });
  },
};
