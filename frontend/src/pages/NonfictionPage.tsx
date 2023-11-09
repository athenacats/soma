import { Helmet } from "react-helmet-async";
import NonfictionBooks from "../components/NonfictionBooks";

export const NonfictionPage = () => {
  return (
    <div className="body-container">
      <Helmet>
        <title>Nonfiction Books</title>
      </Helmet>
      <NonfictionBooks />
    </div>
  );
};
