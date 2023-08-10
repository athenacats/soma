import { Spinner } from "react-bootstrap";

export default function LoadingMessage() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
