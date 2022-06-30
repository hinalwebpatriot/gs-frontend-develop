import React from "react";

const RobotPagination = ({ lastPage }) => {
  const pagination = Array(lastPage)
    .fill(null)
    .map((item, index) => {
      const href = `?page=${index + 1}`;
      const rel = index > 0 ? "noindex, follow" : "";
      return (
        <li key={`pag_${href}`}>
          <a href={href} rel={rel}>
            Page {index + 1}
          </a>
        </li>
      );
    });

  return (
    <nav style={{ display: "none" }}>
      <ul>{pagination}</ul>
    </nav>
  );
};

export default RobotPagination;
