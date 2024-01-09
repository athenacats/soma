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
    <Card className="mb-3" style={{ cursor: "pointer" }}>
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

      <Card.Body>
        <Card.Title>{book.name}</Card.Title>

        <Card.Subtitle>by {book.author}</Card.Subtitle>

        <Rating yourRating={book.rating} book={book} />
      </Card.Body>
    </Card>
  );
}
