import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Book } from "../types/Book";
import Rating from "./Rating";

export default function BookItem({ book }: { book: Book }) {
  {
    console.log(`${encodeURIComponent(book.author!)}`);
  }
  const url = `/book/${book.slugName}/${book.slugAuthor}`;

  console.log("Request URL:", url);
  return (
    <Card style={{ cursor: "pointer" }}>
      <Link to={`/book/${book.slugName}/${book.slugAuthor}`}>
        <img src={book.image} className="card-img-top" alt={book.name} />
      </Link>
      <Card.Body>
        <Link to={`/book/${book.slugName}/${book.slugAuthor}`}>
          <Card.Title>{book.name}</Card.Title>

          <Card.Subtitle>by {book.author}</Card.Subtitle>
        </Link>
        <Rating rating={book.yourRating} />
      </Card.Body>
    </Card>
  );
}
