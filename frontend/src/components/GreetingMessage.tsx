import { Button } from "react-bootstrap";

export const GreetingMessage = () => {
  const handleReleasedBooksClick = () => {
    window.open("https://www.goodreads.com/news?ref=nav_brws_news");
  };

  const handleBarnesBooksClick = () => {
    window.open("https://www.barnesandnoble.com/b/books/_/N-1sZ29Z8q8");
  };

  return (
    <div
      className=" d-flex flex-column justify-content-around"
      style={{ height: 300 }}
    >
      <h1 className="text-center home-message">
        Discover Books From Your Favorite Website and Get Them Here
      </h1>
      <div className="d-flex w-100 gap-5">
        <Button
          className="redirecting-buttons"
          onClick={handleReleasedBooksClick}
        >
          Goodreads Just Released Books
        </Button>
        <Button
          className="redirecting-buttons"
          onClick={handleBarnesBooksClick}
        >
          Barnes & Noble Just Released Books
        </Button>
      </div>
    </div>
  );
};
