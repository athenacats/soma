import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Col, Row } from "react-bootstrap";
import LoadingMessage from "../components/LoadingMessage";
import MessageBox from "../components/MessageBox";
import BookItem from "../components/BookItem";
import { useGetBooksQuery } from "../hooks/bookHooks";
import { useState } from "react";

const ITEMS_PER_PAGE = 10;

export default function NewBooksThisWeek() {
  const { isLoading, error, data: books } = useGetBooksQuery();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(books?.length || 0) / ITEMS_PER_PAGE;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPagination = () => {
    const pageNumbers = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );

    return (
      <div className="text-center mt-3">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
  };

  const renderBooks = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return (
      <Row>
        {books?.slice(startIndex, endIndex).map((book, index) => (
          <Col key={index} sm={12} md={6} lg={6}>
            <BookItem book={book} />
          </Col>
        ))}
      </Row>
    );
  };

  return isLoading ? (
    <LoadingMessage />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <div className="body-container">
      <div>
        <h1 className="text-center mb-2">
          <span className="first-letter">N</span>ew{" "}
          <span className="first-letter">B</span>ooks{" "}
          <span className="first-letter">T</span>his{" "}
          <span className="first-letter">W</span>eek
        </h1>

        <h5 className="mb-3 text-center">Click on a book to download!</h5>

        {renderBooks()}
        {renderPagination()}
      </div>
    </div>
  );
}
