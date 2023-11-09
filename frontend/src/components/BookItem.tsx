import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Book } from "../types/Book";
import Rating from "./Rating";

export default function BookItem({ book }: { book: Book }) {
  const isGoodreadsPageActive =
    location.pathname === "/fiction" ||
    location.pathname === "/mystery&crime" ||
    location.pathname === "/romance" ||
    location.pathname === "/science&tech" ||
    location.pathname === "/scifi" ||
    location.pathname === "/teens&ya" ||
    location.pathname === "/thriller" ||
    location.pathname === "/horror" ||
    location.pathname === "/fantasy" ||
    location.pathname === "/nonfiction";
  return (
    <Card className="mb-3" style={{ cursor: "pointer" }}>
      <Link to={`/book/${book.slugName}/${book.slugAuthor}`}>
        <img src={book.image} className="card-img-top" alt={book.name} />
      </Link>
      <Card.Body>
        <Link to={`/book/${book.slugName}/${book.slugAuthor}`}>
          <Card.Title>{book.name}</Card.Title>

          {isGoodreadsPageActive ? (
            ""
          ) : (
            <Card.Subtitle>by {book.author}</Card.Subtitle>
          )}
        </Link>
        <Rating yourRating={book.yourRating} book={book} />
      </Card.Body>
    </Card>
  );
}
