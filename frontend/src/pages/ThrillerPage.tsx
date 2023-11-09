import { Helmet } from "react-helmet-async";
import ThrillerBooks from "../components/ThrillerBooks";

export const ThrillerPage = () => {
  return (
    <div className="body-container">
      <Helmet>
        <title>Thriller Books</title>
      </Helmet>
      <ThrillerBooks />
    </div>
  );
};
