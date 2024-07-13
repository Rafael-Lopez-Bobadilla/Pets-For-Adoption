import { useSearchParams } from "react-router-dom";
import { Pagination as PaginationMui } from "@mui/material";
import s from "./Pagination.module.css";
import { useParamsUpdate } from "../../../../hooks/useParamsUpdate";
const Pagination = ({ pageCount }: { pageCount: number }) => {
  const [params, _setParams] = useSearchParams();
  const { changePage } = useParamsUpdate();
  let page = Number(params.get("page"));
  const handleChange = (_e: any, value: number) => {
    changePage(value.toString());
  };
  return (
    <div className={s.container}>
      <PaginationMui
        className={s.pagination}
        count={pageCount}
        boundaryCount={0}
        siblingCount={1}
        onChange={handleChange}
        page={page}
      />
    </div>
  );
};

export default Pagination;
