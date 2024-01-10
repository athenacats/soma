import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Col, Row } from "react-bootstrap";
import LoadingMessage from "../components/LoadingMessage";
import MessageBox from "../components/MessageBox";
import BookItem from "../components/BookItem";
import { useGetBooksQuery } from "../hooks/bookHooks";

export default function NewBooksThisWeek() {
  const { isLoading, error, data: books } = useGetBooksQuery();

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

        <Row>
          {books!.slice(0, 48).map((book, index) => (
            <Col key={index} sm={12} md={6} lg={6}>
              <BookItem book={book} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
