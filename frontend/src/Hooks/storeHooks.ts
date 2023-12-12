


import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { StateType,DispatchType } from "../redux/app/store";


export const useStoreSelector: TypedUseSelectorHook<StateType> = useSelector;
export const useStoreDispatch = ()=> useDispatch<DispatchType>();