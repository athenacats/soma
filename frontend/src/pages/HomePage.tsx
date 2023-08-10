import React, { useEffect, useReducer } from "react";
import { Book } from "../types/Book";
import axios from "axios";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Col, Row } from "react-bootstrap";

type State = {
  books: Book[];
  loadingBooks: boolean;
  error: string;
};

type Action =
  | { type: "FETCH_REQUEST" }
  | { type: "FETCH_SUCCESS"; payload: Book[] }
  | { type: "FETCH_FAIL"; payload: string };

const initialState: State = {
  books: [],
  loadingBooks: true,
  error: "",
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loadingBooks: true };
    case "FETCH_SUCCESS":
      return { ...state, loadingBooks: false, books: action.payload };
    case "FETCH_FAIL":
      return { ...state, loadingBooks: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [{ loadingBooks, error, books }, dispatch] = useReducer<
    React.Reducer<State, Action>
  >(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error as ApiError) });
      }
    };
    fetchData();
  }, []);

  return loadingBooks ? (
    <h4>why</h4>
  ) : error ? (
    <h4>why</h4>
  ) : (
    <div className="body-container">
      <h4 className="text-center ">Life is dull without books...</h4>
      <Row>
        {books.map((book, index) => (
          <Col key={index} sm={6} md={4} lg={3}>
            <img
              className="img-thumbnail "
              src={book.image}
              alt={book.name}
            ></img>
            <h4>{book.name}</h4>
            <h4>by {book.author}</h4>
          </Col>
        ))}
      </Row>
    </div>
  );
}
