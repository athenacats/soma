import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Col, Row } from "react-bootstrap";
import LoadingMessage from "../components/LoadingMessage";
import MessageBox from "../components/MessageBox";
import BookItem from "../components/BookItem";
import { useGetFictionBooksQuery } from "../hooks/bookHooks";

export default function FictionBooks() {
  const { isLoading, error, data: books } = useGetFictionBooksQuery();

  return isLoading ? (
    <LoadingMessage />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <div className="body-container">
      <div>
        <h4 className="text-center mb-4">Best Selling Fiction Books</h4>
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
