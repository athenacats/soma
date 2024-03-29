import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Button, Card, Container, Row } from "react-bootstrap";
import { Book } from "../types/Book";
import Rating from "../components/Rating";
import GoodreadsRating from "../components/GoodreadsRating";

export default function BookPage() {
  const location = useLocation();
  const bookDetails = location.state;

  if (!bookDetails) {
    return <div>Error: Book details not found</div>;
  }

  const { name, author, image, rating, yourRating, description } = bookDetails;

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

  return (
    <div>
      <Row>
        <Helmet>
          <title>
            {name} by {author}
          </title>
        </Helmet>

        <h5 className="text-center mb-3">
          For a smooth experience, please use a VPN and ensure that you have
          signed in to Mobilism before downloading from the site
        </h5>

        <div style={{ width: "80%", margin: "auto" }}>
          <Card className="mb-3 " style={{ cursor: "pointer" }}>
            <img
              src={image}
              className="card-img-top"
              style={{ width: "50%" }}
              alt={name}
            />

            <Card.Body className="d-flex flex-column " style={{ gap: "1rem" }}>
              <Card.Title
                style={{
                  fontSize: "1.5rem",
                  color: "#f5ad43",
                  textDecoration: "underline",
                }}
              >
                {name}
              </Card.Title>

              <Card.Subtitle
                style={{ textDecoration: "underline", color: "#f5ad43" }}
              >
                by {author}
              </Card.Subtitle>

              <Card.Subtitle
                style={{
                  cursor: "default",
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                  //justifyContent: "space-around",
                  fontSize: "1.1rem",
                }}
              >
                Goodreads Rating: {"   "}
                <span style={{ color: "#f5ad43", fontSize: "1.3rem" }}>
                  {" "}
                  {rating}
                </span>
                <span style={{ minWidth: "100px" }}>
                  <GoodreadsRating rating={rating}></GoodreadsRating>
                </span>
              </Card.Subtitle>
              <Card.Subtitle
                style={{
                  cursor: "default !important",
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                  fontSize: "1.1rem",
                }}
              >
                My Rating:{" "}
                <span>
                  <Rating yourRating={yourRating} book={bookDetails} />
                </span>
              </Card.Subtitle>
              <Card.Text
                dangerouslySetInnerHTML={{ __html: description }}
                id="bookDescription"
                style={{ cursor: "default" }}
              ></Card.Text>
            </Card.Body>
          </Card>
          <Container className="d-flex justify-content-evenly flex-wrap">
            <Button
              className="mt-2 btn btn-primary btn-sm"
              onClick={() => audioBookMobilism(bookDetails)}
            >
              <i className="fas fa-headphones"></i> From Mobilism
            </Button>
            <Button
              className="mt-2 btn btn-primary btn-sm"
              onClick={() => audioBookAudioBookBay(bookDetails)}
            >
              <i className="fas fa-headphones"></i> From AudioBookBay
            </Button>
            <Button
              className="mt-2 btn btn-primary btn-sm"
              onClick={() => audioBookMobilism(bookDetails)}
            >
              <i className="fas fa-book-open"></i> From Mobilism
            </Button>
            <Button
              className="mt-2 btn btn-primary btn-sm"
              onClick={() => ebookZLibrary(bookDetails)}
            >
              <i className="fas fa-book-open"></i> From Z-Library
            </Button>
          </Container>
        </div>
      </Row>
    </div>
  );
}
