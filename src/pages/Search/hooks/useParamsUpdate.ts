import { useSearchParams } from "react-router-dom";
import { TParamKey } from "../utils/paramsSchema";
export const useParamsUpdate = () => {
  const [params, setParams] = useSearchParams();
  const getNewParams = () => {
    const newParams = new URLSearchParams(params);
    newParams.set("page", "1");
    return newParams;
  };
  const changeType = (value: string) => {
    setParams({ type: value, page: "1" });
  };
  const changeParam = (key: TParamKey, value: string) => {
    const newParams = getNewParams();
    newParams.set(key, value);
    setParams(newParams);
  };
  const removeParam = (key: TParamKey) => {
    const newParams = getNewParams();
    newParams.delete(key);
    setParams(newParams);
  };
  return { changeType, changeParam, removeParam };
};
