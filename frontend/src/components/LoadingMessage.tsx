import { Spinner } from "react-bootstrap";

export default function LoadingMessage() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{ color: "#f5ad43", height: "4rem", width: "4rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
