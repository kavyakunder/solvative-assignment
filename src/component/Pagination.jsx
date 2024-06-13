import React from "react";

const Pagination = ({ perPagePost, length, activePage, handlePagination }) => {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(length / perPagePost); i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className="pagination">
      {paginationNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={activePage === pageNumber ? "active" : ""}
          onClick={() => handlePagination(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
