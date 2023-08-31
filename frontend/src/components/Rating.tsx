import { toast } from "react-toastify";
import { useRateBookMutation } from "../hooks/bookHooks";
import React, { useContext, useState } from "react";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";
import { Book } from "../types/Book";
import { Store } from "../Store";
import { Button, Modal } from "react-bootstrap";

function Rating(props: { yourRating: number; caption?: string; book: Book }) {
  const { yourRating: initialRating, caption, book } = props;
  const [rating, setRating] = React.useState(initialRating);
  const rateBookMutation = useRateBookMutation();
  const [showModal, setShowModal] = useState(false);

  const {
    state: { userInfo },
  } = useContext(Store);

  const handleStarClick = async (newRating: number) => {
    if (userInfo) {
      setRating(newRating);
      try {
        rateBookMutation.mutate({
          ...userInfo,
          ...book,
          yourRating: newRating,
        });
      } catch (err) {
        toast.error(getError(err as ApiError));
      }
    } else {
      setShowModal(true);
      console.log("error");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>You have to be logged in to rate a book</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {caption ? <span>{caption}</span> : ""}
    </div>
  );
}

export default Rating;
