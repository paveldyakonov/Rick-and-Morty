import classes from "./Pagination.module.scss";

import ReactPaginate from "react-paginate";
import { IoArrowRedoOutline, IoArrowUndoOutline } from "react-icons/io5";
import { useRouter } from "next/router";

type Props = {
  pageCount: number;
  forcePage: number;
};

export const Pagination: React.FC<Props> = ({ pageCount, forcePage }) => {
  const router = useRouter();

  const setPageInQuery = (value: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: String(value) },
    });
  };

  return (
    <ReactPaginate
      className={classes.root}
      breakLabel="..."
      pageRangeDisplayed={2}
      nextLabel={<IoArrowRedoOutline />}
      onPageChange={(event) => setPageInQuery(event.selected + 1)}
      pageCount={pageCount}
      previousLabel={<IoArrowUndoOutline />}
      renderOnZeroPageCount={null}
      forcePage={forcePage}
    />
  );
};
