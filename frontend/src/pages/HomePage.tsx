import { Helmet } from "react-helmet-async";
import NewBooksThisWeek from "../components/NewBooksThisWeek";

export default function HomePage() {
  return (
    <div className="body-container">
      <Helmet>
        <title>Soma</title>
      </Helmet>

      <NewBooksThisWeek></NewBooksThisWeek>
    </div>
  );
}
