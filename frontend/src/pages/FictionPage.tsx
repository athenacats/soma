import { Helmet } from "react-helmet-async";
import FictionBooks from "../components/FictionBooks";

export default function FictionPage() {
  return (
    <div className="body-container">
      <Helmet>
        <title>Fiction Books</title>
      </Helmet>
      <FictionBooks />
    </div>
  );
}
