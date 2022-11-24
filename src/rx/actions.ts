import { appStore } from "rx/app";
import categoryService from "services/categoryService";
import configService from "services/configService";

export async function fetchCategories() {
  var response = await categoryService.fetchCategories();

  appStore.push({
    ...appStore.getState(),
    categories: response.data,
  });
}

export async function fetchSettings() {
  var response = await configService.getSettings();

  appStore.push({
    ...appStore.getState(),
    settings: Object.assign(
      {},
      ...response.data.map((x: any) => ({ [x.name]: x.value })),
    ),
  });
}
