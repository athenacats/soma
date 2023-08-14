import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useGetBookDetailsBySlugQuery } from "../hooks/bookHooks";
import LoadingMessage from "../components/LoadingMessage";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";

export default function BookPage() {
  const params = useParams();
  const { slug } = params;
  const { data: book, isLoading, error } = useGetBookDetailsBySlugQuery(slug!);
  return isLoading ? (
    <LoadingMessage />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !book ? (
    <MessageBox variant="danger">Book Not Found</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Book Details</title>
      </Helmet>
      BookPage
    </div>
  );
}
