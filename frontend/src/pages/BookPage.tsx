import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBookDetailsBySlugQuery } from "../hooks/bookHooks";
import LoadingMessage from "../components/LoadingMessage";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Button, Col, Container, Row } from "react-bootstrap";
import BookItem from "../components/BookItem";
import { Book } from "../types/Book";

export default function BookPage() {
  const params = useParams();
  const { slugName, slugAuthor } = params;
  const {
    data: books,
    isLoading,
    error,
  } = useGetBookDetailsBySlugQuery(slugName!, slugAuthor!);

  let uniqueBooks: Book[] = [];

  if (books) {
    const titleSet = new Set();
    uniqueBooks = books.filter((book) => {
      if (!titleSet.has(book.name)) {
        titleSet.add(book.name);
        return true;
      }
      return false;
    });
  }

  function audioBookMobilism(clickedBook: Book) {
    window.open(
      `https://forum.mobilism.org/search.php?keywords=${clickedBook.slugName}+${clickedBook.slugAuthor}&sr=topics&sf=titleonly`
    );
  }

  function audioBookAudioBookBay(clickedBook: Book) {
    window.open(
      `https://audiobookbay.is/?s=${clickedBook.slugName}+${clickedBook.slugAuthor}&cat=undefined%2Cundefined`
    );
  }
  function ebookZLibrary(clickedBook: Book) {
    const formattedSlugName = clickedBook.slugName.replace(/\+/g, "%20");
    const formattedSlugAuthor = clickedBook.slugAuthor.replace(/\+/g, "%20");
    window.open(
      `https://zlibrary-asia.se/s/${formattedSlugName}%20${formattedSlugAuthor}`
    );
  }

  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Navigate to the homepage
    navigate("/");
  };

  return isLoading ? (
    <LoadingMessage />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !books ? (
    <MessageBox variant="danger">Book Not Found</MessageBox>
  ) : (
    <div>
      <Row>
        <Helmet>
          <title>
            {uniqueBooks.length > 0
              ? `${uniqueBooks[0]?.name} by ${uniqueBooks[0]?.author}`
              : "Book Not Yet On Database"}
          </title>
        </Helmet>

        <h5 className="text-center mb-3">
          {uniqueBooks.length > 0
            ? "For a smooth experience, please ensure that you have signed in to Mobilism before downloading from the site"
            : ""}
        </h5>

        {uniqueBooks.length > 0 ? (
          uniqueBooks.slice(0, 8).map((book, index) => (
            <Col key={index} sm={6} md={4} lg={3}>
              <BookItem book={book} />
              <Container className="d-flex justify-content-evenly flex-wrap">
                <Button
                  className="mt-2 btn btn-primary btn-sm"
                  onClick={() => audioBookMobilism(book)}
                >
                  <i className="fas fa-headphones"></i> From Mobilism
                </Button>
                <Button
                  className="mt-2 btn btn-primary btn-sm"
                  onClick={() => audioBookAudioBookBay(book)}
                >
                  <i className="fas fa-headphones"></i> From AudioBookBay
                </Button>
                <Button
                  className="mt-2 btn btn-primary btn-sm"
                  onClick={() => audioBookMobilism(book)}
                >
                  <i className="fas fa-book-open"></i> From Mobilism
                </Button>
                <Button
                  className="mt-2 btn btn-primary btn-sm"
                  onClick={() => ebookZLibrary(book)}
                >
                  <i className="fas fa-book-open"></i> From Z-Library
                </Button>
              </Container>
            </Col>
          ))
        ) : (
          <>
            <h4 className="text-center">Book Not Yet On Our Database</h4>
            <Button
              className=" mt-5 btn btn-primary btn-sm w-50 m-auto "
              onClick={handleButtonClick}
            >
              <i className="fas fa-home"></i> Discover Your Next Five Star Read!
            </Button>
          </>
        )}
      </Row>
    </div>
  );
}
