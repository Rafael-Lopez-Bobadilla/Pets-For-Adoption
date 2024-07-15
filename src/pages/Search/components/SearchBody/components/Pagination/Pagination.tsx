import { Pagination as PaginationMui } from "@mui/material";
import s from "./Pagination.module.css";
import { useValidParams } from "../../../../context/ValidParamsContext/context";
const Pagination = ({ pageCount }: { pageCount: number }) => {
  const { changePage, params } = useValidParams();
  const page = params ? Number(params?.page) : 1;
  const handleChange = (_e: any, value: number) => {
    changePage(value.toString());
  };
  if (pageCount === 0) return <></>;
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
