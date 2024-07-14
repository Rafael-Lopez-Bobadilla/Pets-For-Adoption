import { createContext, useContext } from "react";
import { TParamKey, TValidParams } from "../../utils/paramsSchema";
type TValidParamsContext = {
  params: TValidParams | null;
  changeParam: (key: TParamKey, value: string) => void;
  removeParam: (key: TParamKey) => void;
  changeType: (value: string) => void;
  clearFilters: () => void;
  changePage: (page: string) => void;
};
export const ValidParamsContext = createContext<TValidParamsContext | null>(
  null
);

export const useValidParams = () => {
  const value = useContext(ValidParamsContext);
  if (!value)
    throw new Error(
      "Valid params context can only be used within its provider"
    );
  return value;
};
