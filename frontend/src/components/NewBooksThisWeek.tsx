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
        <h1 className="text-center mb-4">
          <span className="first-letter">N</span>ew{" "}
          <span className="first-letter">B</span>ooks{" "}
          <span className="first-letter">T</span>his{" "}
          <span className="first-letter">W</span>eek
        </h1>
        <Row>
          {books!.slice(0, 8).map((book, index) => (
            <Col key={index} sm={6} md={4} lg={3}>
              <BookItem book={book} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
