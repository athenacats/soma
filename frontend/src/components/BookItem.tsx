import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Book } from "../types/Book";

export default function BookItem({ book }: { book: Book }) {
  return (
    <Card>
      <Link to={`/book/${book.slug}`}></Link>
    </Card>
  );
}
