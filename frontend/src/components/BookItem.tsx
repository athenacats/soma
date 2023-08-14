import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Book } from "../types/Book";
import Rating from "./Rating";
import axios from "axios";

export default function BookItem({ book }: { book: Book }) {
  const handleBookClick = async () => {
    try {
      await axios.post("/api/book/slug", { slug: book.slug });

      window.location.href = `/book/${book.slug}`;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Card onClick={handleBookClick} style={{ cursor: "pointer" }}>
      <Link to={`/book/${book.slug}`}>
        <img src={book.image} className="card-img-top" alt={book.name} />
      </Link>
      <Card.Body>
        <Link to={`/book/${book.slug}`}>
          <Card.Title>{book.name}</Card.Title>
          <Card.Subtitle>by {book.author}</Card.Subtitle>
        </Link>
        <Rating rating={book.yourRating} />
      </Card.Body>
    </Card>
  );
}
