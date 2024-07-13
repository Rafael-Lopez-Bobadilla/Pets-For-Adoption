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
  const changePage = (page: string) => {
    setParams((params) => {
      params.set("page", page);
      return params;
    });
  };
  const clearFilters = () => {
    const newParams = getNewParams();
    const location = params.get("location");
    newParams.delete("coat");
    newParams.delete("color");
    newParams.delete("gender");
    newParams.delete("breed");
    location && newParams.set("location", location);
    setParams(newParams);
  };
  return { changeType, changeParam, removeParam, changePage, clearFilters };
};
