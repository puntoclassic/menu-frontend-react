import categoryService from "@src/services/categoryService";
import configService from "@src/services/configService";
import { pushCategories, pushSettings } from "../reducers/app";

export function fetchCategories() {
  return async function (dispatch: any, getState: any) {
    var response = await categoryService.fetchCategories();

    dispatch(pushCategories({
      categories: response.data,
    }));
  };
}

export function fetchSettings() {
  return async function (dispatch: any, getState: any) {
    var response = await configService.getSettings();

    dispatch(pushSettings(
      response.data,
    ));
  };
}
