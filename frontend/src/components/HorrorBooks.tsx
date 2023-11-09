import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Col, Row } from "react-bootstrap";
import LoadingMessage from "../components/LoadingMessage";
import MessageBox from "../components/MessageBox";
import BookItem from "../components/BookItem";
import { useGetHorrorBooksQuery } from "../hooks/bookHooks";

export default function HorrorBooks() {
  const { isLoading, error, data: books } = useGetHorrorBooksQuery();

  return isLoading ? (
    <LoadingMessage />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <div className="body-container">
      <div>
        <h1 className="text-center mb-4">Best Selling Horror Books</h1>
        <Row>
          {books!.slice(0, 90).map((book, index) => (
            <Col key={index} sm={6} md={4} lg={3}>
              <BookItem book={book} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
