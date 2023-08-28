import { useRateBookMutation } from "../hooks/bookHooks";
import React from "react";

function Rating(props: { rating: number; caption?: string; bookId: string }) {
  const { rating: initialRating, caption, bookId } = props;
  const [rating, setRating] = React.useState(initialRating);
  const rateBookMutation = useRateBookMutation();

  const handleStarClick = (newRating: number) => {
    setRating(newRating);

    rateBookMutation.mutate({
      bookId,
      rating: newRating,
    });
  };
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((starNumber) => (
        <span key={starNumber} onClick={() => handleStarClick(starNumber)}>
          <i
            className={
              rating >= starNumber
                ? "fas fa-star"
                : rating >= starNumber - 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          />
        </span>
      ))}
      {caption ? <span>{caption}</span> : ""}
    </div>
  );
}

export default Rating;
