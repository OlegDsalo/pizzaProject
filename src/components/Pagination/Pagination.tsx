import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.scss";
interface PaginationProps {
  onChangePage: (number: number) => void;
  page: number;
}
const Pagination: React.FC<PaginationProps> = ({ onChangePage, page }) => {
  return (
    <ReactPaginate
      className="pagination"
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={2}
      forcePage={page - 1}
      previousLabel="<"
    />
  );
};

export default Pagination;
