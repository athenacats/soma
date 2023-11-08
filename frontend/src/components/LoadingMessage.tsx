import { Spinner } from "react-bootstrap";

export default function LoadingMessage() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{ color: "#f5ad43", height: "4rem", width: "4rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <h4 className="text-center pt-4">
        Please wait, fetching books from the database
      </h4>
    </div>
  );
}
