import React from "react";
import ReactPaginate from 'react-paginate';
import LeftRangeArrow from '../../img/svg/left_pagination.svg';

const Paginator = ({ status, pagination, onPageChange, paginationHrefBuilder }) => {
    if (status !== 'success' || !pagination.total || pagination.lastPage === 1) {
        return null;
    }

    return (
        <ReactPaginate
            disableInitialCallback
            initialPage={pagination.currentPage - 1}
            pageCount={pagination.lastPage} 
            pageRangeDisplayed={4} 
            marginPagesDisplayed={0} 
            breakLabel={null}
            previousLabel={<img src={LeftRangeArrow} alt="previous"/>}
            nextLabel={<img src={LeftRangeArrow} alt="next"/>}
            containerClassName="paginator"
            onPageChange={(data) => onPageChange(data.selected + 1)}
            hrefBuilder={paginationHrefBuilder}
        />
    )
}

export default Paginator;