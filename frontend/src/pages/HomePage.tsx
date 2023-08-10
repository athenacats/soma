import { Book } from "../types/Book";

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
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, books: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  return <></>;
}
