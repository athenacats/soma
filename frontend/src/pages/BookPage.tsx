import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Button, Card, Container, Row } from "react-bootstrap";
import { Book } from "../types/Book";
import Rating from "../components/Rating";

export default function BookPage() {
  const location = useLocation();
  const bookDetails = location.state;

  console.log(bookDetails);

  if (!bookDetails) {
    return <div>Error: Book details not found</div>;
  }

  const { name, author, image, rating, description } = bookDetails;

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

            <Card.Body>
              <Card.Title>{name}</Card.Title>

              <Card.Subtitle>by {author}</Card.Subtitle>

              <Rating yourRating={rating} book={bookDetails} />
              <Card.Text
                dangerouslySetInnerHTML={{ __html: description }}
                style={{ fontFamily: "fantasy", cursor: "default" }}
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
