import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Button, Col, Row } from "react-bootstrap";
import LoadingMessage from "../components/LoadingMessage";
import MessageBox from "../components/MessageBox";
import BookItem from "../components/BookItem";
import { useGetScifiBooksQuery } from "../hooks/bookHooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

export default function ScifiFantasyBooks() {
  const currentPage =
    Number(new URLSearchParams(window.location.search).get("page")) || 1;
  const { isLoading, error, data: books } = useGetScifiBooksQuery(currentPage);
  const [currentPageState, setCurrentPageState] = useState<number>(currentPage);
  const navigate = useNavigate();

  const totalPages = Math.ceil(books?.length || 0) / ITEMS_PER_PAGE;

  const handlePageChange = (newPage: number) => {
    setCurrentPageState(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`?page=${newPage}`);
  };

  const handleNextPage = () => {
    if (currentPageState < totalPages) {
      setCurrentPageState(currentPageState + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(`?page=${currentPageState + 1}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPageState > 1) {
      setCurrentPageState(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(`?page=${currentPageState - 1}`);
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
            marginRight: "0.5rem",
            textShadow: "  1px 1px 2px rgb(92, 62, 17)",
          }}
          onClick={handlePrevPage}
          disabled={currentPageState === 1}
        >
          Prev
        </Button>
        {pageNumbers.map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPageState ? "active" : ""}
            style={{
              marginRight: "0.5rem",
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
          disabled={currentPageState === totalPages}
        >
          Next
        </Button>
      </div>
    );
  };

  const renderBooks = () => {
    const startIndex = (currentPageState - 1) * ITEMS_PER_PAGE;
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
        <h1 className="text-center mb-4">Best Selling Science Fiction Books</h1>
        {renderBooks()}
        {renderPagination()}
      </div>
    </div>
  );
}
