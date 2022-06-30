import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageChange, lastPage, ...rest }) => (
  <ReactPaginate
    previousLabel={"<"}
    nextLabel={">"}
    breakLabel={<a>...</a>}
    onPageChange={pageChange}
    pageCount={parseInt(lastPage, 10)}
    marginPagesDisplayed={1}
    pageRangeDisplayed={3}
    containerClassName={"pagination"}
    activeClassName={"active"}
    {...rest}
  />
);

export default Pagination;
