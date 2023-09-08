import { Card } from "react-bootstrap";
import { Book } from "../types/Book";
import Rating from "./Rating";

export default function BookItemSearchResults({ book }: { book: Book }) {
  return (
    <Card className="mb-3" style={{ cursor: "pointer" }}>
      <img src={book.image} className="card-img-top" alt={book.name} />

      <Card.Body>
        <Card.Title>{book.name}</Card.Title>

        <Card.Subtitle>by {book.author}</Card.Subtitle>

        <Rating yourRating={book.rating} book={book} />
      </Card.Body>
    </Card>
  );
}
