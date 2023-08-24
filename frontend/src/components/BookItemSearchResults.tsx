import { Card } from "react-bootstrap";
import { Book } from "../types/Book";
import Rating from "./Rating";

export default function BookItemSearchResults({ book }: { book: Book }) {
  const url = `/book/${book.slugName}/${book.slugAuthor}`;

  console.log("Request URL:", url);
  return (
    <Card style={{ cursor: "pointer" }}>
      <img src={book.image} className="card-img-top" alt={book.name} />

      <Card.Body>
        <Card.Title>{book.name}</Card.Title>

        <Card.Subtitle>by {book.author}</Card.Subtitle>

        <Rating rating={book.yourRating} />
      </Card.Body>
    </Card>
  );
}
