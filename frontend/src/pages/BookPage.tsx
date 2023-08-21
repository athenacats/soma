import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useGetBookDetailsBySlugQuery } from "../hooks/bookHooks";
import LoadingMessage from "../components/LoadingMessage";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Col, Row } from "react-bootstrap";
import BookItem from "../components/BookItem";
import { Book } from "../types/Book";

export default function BookPage() {
  const params = useParams();
  const { slugName, slugAuthor } = params;
  const {
    data: books,
    isLoading,
    error,
  } = useGetBookDetailsBySlugQuery(slugName!, slugAuthor!);

  let uniqueBooks: Book[] = [];

  if (books) {
    const titleSet = new Set();
    uniqueBooks = books.filter((book) => {
      if (!titleSet.has(book.name)) {
        titleSet.add(book.name);
        return true;
      }
      return false;
    });
  }

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
          <title>
            {uniqueBooks[0]?.name} by {uniqueBooks[0]?.author}
          </title>
        </Helmet>
        {uniqueBooks.slice(0, 8).map((book, index) => (
          <Col key={index} sm={6} md={4} lg={3}>
            <BookItem book={book} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
