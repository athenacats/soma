import { Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Book } from "../types/Book";
import Rating from "./Rating";
import { useState } from "react";
import GoodreadsRating from "./GoodreadsRating";

const BookItem: React.FC<{ book: Book }> = ({ book }) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);

  const handleImageLoad = () => {
    setImageIsLoading(false);
  };

  return (
    <Card
      className="mb-3"
      style={{ cursor: "pointer", border: "1px solid #f5ad43" }}
    >
      <Link to={`/book/${book.slugName}/${book.slugAuthor}`} state={book}>
        {imageIsLoading && (
          <Spinner
            animation="border"
            role="status"
            style={{
              color: "#f5ad43",
              height: "2rem",
              width: "2rem",
              marginTop: "1rem",
            }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        <img
          src={book.image}
          className="card-img-top"
          style={{ width: "250px" }}
          alt={book.name}
          onLoad={handleImageLoad}
        />
      </Link>
      <Card.Body className="d-flex flex-column " style={{ gap: "1rem" }}>
        <Link
          to={`/book/${book.slugName}/${book.slugAuthor}`}
          state={book}
          className="d-flex flex-column "
          style={{ gap: "0.1rem" }}
        >
          <Card.Title
            className="bookName"
            style={{
              fontSize: "1.5rem",
              color: "#f5ad43",
              textDecoration: "underline",
            }}
          >
            {book.name}
          </Card.Title>
          <Card.Subtitle
            className="bookAuthor"
            style={{ textDecoration: "underline", color: "#f5ad43" }}
          >
            by {book.author}
          </Card.Subtitle>
        </Link>
        <Card.Subtitle
          style={{
            cursor: "default",
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            fontSize: "1.1rem",
          }}
        >
          Goodreads Rating:{"   "}
          <span style={{ color: "#f5ad43", fontSize: "1.3rem" }}>
            {" "}
            {book.rating}
          </span>{" "}
          <span>
            <GoodreadsRating rating={book.rating}></GoodreadsRating>
          </span>
        </Card.Subtitle>
        <Card.Subtitle
          style={{
            cursor: "default",
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            fontSize: "1.1rem",
          }}
        >
          My Rating:{"   "}
          <span>
            <Rating yourRating={book.yourRating} book={book} />
          </span>
        </Card.Subtitle>

        <Card.Text
          dangerouslySetInnerHTML={{ __html: book.description }}
          style={{ fontFamily: "fantasy", cursor: "default" }}
        ></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BookItem;
