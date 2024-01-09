import { Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Book } from "../types/Book";
import Rating from "./Rating";
import { useState } from "react";

export default function BookItem({ book }: { book: Book }) {
  const [imageIsLoading, setImageIsLoading] = useState(true);

  const handleImageLoad = () => {
    setImageIsLoading(false);
  };
  /* const isGoodreadsPageActive =
    location.pathname === "/fiction" ||
    location.pathname === "/mystery&crime" ||
    location.pathname === "/romance" ||
    location.pathname === "/science&tech" ||
    location.pathname === "/scifi" ||
    location.pathname === "/teens&ya" ||
    location.pathname === "/thriller" ||
    location.pathname === "/horror" ||
    location.pathname === "/fantasy" ||
    location.pathname === "/nonfiction" ||
    location.pathname === "/";*/
  return (
    <Card className="mb-3" style={{ cursor: "pointer" }}>
      <Link to={`/book/${book.slugName}/${book.slugAuthor}`}>
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
      </Link>
      <Card.Body>
        <Link to={`/book/${book.slugName}/${book.slugAuthor}`}>
          <Card.Title>{book.name}</Card.Title>

          <Card.Subtitle style={{ textDecorationLine: "none !important" }}>
            by {book.author}
          </Card.Subtitle>
        </Link>
        <Rating yourRating={book.yourRating} book={book} />
      </Card.Body>
    </Card>
  );
}
