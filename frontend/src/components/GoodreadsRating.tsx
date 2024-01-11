function GoodreadsRating(props: { rating: number }) {
  const { rating: bookRating } = props;

  return (
    <div className="rating" id="goodreadsRating">
      {[1, 2, 3, 4, 5].map((starNumber) => (
        <span key={starNumber}>
          <i
            className={
              bookRating >= starNumber
                ? "fas fa-star"
                : bookRating >= starNumber - 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
            style={{ cursor: "default" }}
          />
        </span>
      ))}
    </div>
  );
}

export default GoodreadsRating;
