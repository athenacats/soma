import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBookDetailsBySearchQuery } from "../hooks/bookHooks";
import LoadingMessage from "../components/LoadingMessage";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Book } from "../types/Book";
import BookItemSearchResults from "../components/BookItemSearchResults";

export default function SeachResultsPage() {
  const params = useParams();
  const { slugName } = params;
  const {
    data: books,
    isLoading,
    error,
  } = useGetBookDetailsBySearchQuery(slugName!);

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

  return isLoading ? (
    <LoadingMessage />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !books ? (
    <MessageBox variant="danger">Book Not Found</MessageBox>
  ) : (
    <div>
      <h3 className="text-center mb-4">Search Results</h3>
      <Row>
        <Helmet>
          <title>
            {books.length > 0 ? "Search Results" : "Book Not Yet On Database"}
          </title>
        </Helmet>
        <h5 className="text-center mb-3">
          {books.length > 0
            ? "For a smooth experience, please use a VPN and ensure that you have signed in to Mobilism before downloading from the site"
            : ""}
        </h5>
        {books.length > 0 ? (
          books.slice(0, 8).map((book, index) => (
            <Col key={index} sm={6} md={4} lg={3}>
              <BookItemSearchResults book={book} />
              <Container
                className="d-flex justify-content-evenly flex-wrap"
                style={{ paddingBottom: "0.5rem" }}
              >
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
                  className="mt-2 mb-3 btn btn-primary btn-sm"
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
              className="mt-5 btn btn-primary btn-sm w-50 m-auto "
              onClick={useNavigate}
            >
              <i className="fas fa-home"></i> Discover Your Next Five Star Read!
            </Button>
          </>
        )}
      </Row>
    </div>
  );
}
