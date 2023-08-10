import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Col, Row } from "react-bootstrap";
import LoadingMessage from "../components/LoadingMessage";
import MessageBox from "../components/MessageBox";
import BookItem from "../components/BookItem";
import { Helmet } from "react-helmet-async";
import { useGetBooksQuery } from "../hooks/bookHooks";

export default function HomePage() {
  const { isLoading, error, data: books } = useGetBooksQuery();

  return isLoading ? (
    <LoadingMessage />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <div className="body-container">
      <h4 className="text-center ">Life is dull without books...</h4>
      <Row>
        <Helmet>
          <title>Soma</title>
        </Helmet>
        {books!.map((book, index) => (
          <Col key={index} sm={6} md={4} lg={3}>
            <BookItem book={book} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
