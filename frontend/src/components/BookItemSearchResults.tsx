import { Card, Spinner } from "react-bootstrap";
import { Book } from "../types/Book";
import Rating from "./Rating";
import { useState } from "react";

export default function BookItemSearchResults({ book }: { book: Book }) {
  const [imageIsLoading, setImageIsLoading] = useState(true);

  const handleImageLoad = () => {
    setImageIsLoading(false);
  };

  return (
    <Card
      className="mb-3"
      style={{ cursor: "pointer", border: "1px solid #f5ad43" }}
    >
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
        alt={book.name}
        onLoad={handleImageLoad}
      />

      <Card.Body className="d-flex flex-column " style={{ gap: "1rem" }}>
        <Card.Title
          style={{
            fontSize: "1.5rem",
            cursor: "default",
            color: "#f5ad43",
            textDecoration: "underline",
          }}
        >
          {book.name}
        </Card.Title>

        <Card.Subtitle
          style={{
            textDecoration: "underline",
            color: "#f5ad43",
            cursor: "default",
          }}
        >
          by {book.author}
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
          My Rating:{" "}
          <span style={{ cursor: "pointer" }}>
            <Rating yourRating={book.rating} book={book} />
          </span>
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}
