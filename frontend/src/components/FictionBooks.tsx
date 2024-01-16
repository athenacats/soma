import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Button, Col, Row } from "react-bootstrap";
import LoadingMessage from "../components/LoadingMessage";
import MessageBox from "../components/MessageBox";
import BookItem from "../components/BookItem";
import { useGetFictionBooksQuery } from "../hooks/bookHooks";
import { useState } from "react";

const ITEMS_PER_PAGE = 10;

export default function FictionBooks() {
  const { isLoading, error, data: books } = useGetFictionBooksQuery();
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
        <Button
          style={{
            border: "1px solid #fff",
            marginBottom: "0.5rem",
            textShadow: "  1px 1px 2px rgb(92, 62, 17)",
          }}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        {pageNumbers.map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? "active" : ""}
            style={{
              marginLeft: "0.5rem",
              border: "1px solid #fff",
              marginBottom: "0.5rem",
              textShadow: "  1px 1px 2px rgb(92, 62, 17)",
            }}
          >
            {page}
          </Button>
        ))}
        <Button
          style={{
            border: "1px solid #fff",
            marginBottom: "0.5rem",
            textShadow: "  1px 1px 2px rgb(92, 62, 17)",
          }}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
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
        <h1 className="text-center mb-4">Best Selling Fiction Books</h1>
        {renderBooks()}
        {renderPagination()}
      </div>
    </div>
  );
}
