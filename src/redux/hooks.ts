import { TypedUseSelectorHook, useSelector } from "react-redux";
import store from "./store";
import { RootState } from "./@src/types/reduxTypes";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const storeDispatch = store.dispatch;
