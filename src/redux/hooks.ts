import { TypedUseSelectorHook, useSelector } from "react-redux";
import store from "./store";
import { RootState } from "../types/appTypes";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const storeDispatch = store.dispatch;
