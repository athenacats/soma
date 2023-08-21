import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useGetBookDetailsBySlugQuery } from "../hooks/bookHooks";
import LoadingMessage from "../components/LoadingMessage";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Col, Row } from "react-bootstrap";
import BookItem from "../components/BookItem";

export default function BookPage() {
  const params = useParams();
  const { slugName, slugAuthor } = params;
  const {
    data: books,
    isLoading,
    error,
  } = useGetBookDetailsBySlugQuery(slugName!, slugAuthor!);
  return isLoading ? (
    <LoadingMessage />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !books ? (
    <MessageBox variant="danger">Book Not Found</MessageBox>
  ) : (
    <div>
      <Row>
        <Helmet>
          <title>Soma</title>
        </Helmet>
        {books!.slice(0, 8).map((book, index) => (
          <Col key={index} sm={6} md={4} lg={3}>
            <BookItem book={book} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
