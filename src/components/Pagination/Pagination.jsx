import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ dogsPerPage, allDogs, currentPage, pagination }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.navP}>
      <ul>
        {currentPage > 1 && (
          <li>
            <button onClick={() => pagination(currentPage - 1)}>
              {"<Back"}
            </button>
          </li>
        )}
        {pageNumbers?.map((number) => {
          return (
            <li key={number}>
              <button
                onClick={() => pagination(number)}
                className={currentPage === number ? styles.active : ""}
              >
                {number}
              </button>
            </li>
          );
        })}
        {currentPage < pageNumbers.length && (
          <li>
            <button onClick={() => pagination(currentPage + 1)}>
              {"Next>"}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;