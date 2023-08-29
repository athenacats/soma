import { toast } from "react-toastify";
import { useRateBookMutation } from "../hooks/bookHooks";
import React from "react";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";

function Rating(props: { rating: number; caption?: string; bookId: string }) {
  const { rating: initialRating, caption, bookId } = props;
  const [rating, setRating] = React.useState(initialRating);
  const rateBookMutation = useRateBookMutation();

  const handleStarClick = async (newRating: number) => {
    setRating(newRating);
    try {
      rateBookMutation.mutate({
        bookId,
        rating: newRating,
      });
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
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
