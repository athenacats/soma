import { Helmet } from "react-helmet-async";
import FantasyBooks from "../components/FantasyBooks";

export const FantasyPage = () => {
  return (
    <div className="body-container">
      <Helmet>
        <title>Fiction Books</title>
      </Helmet>
      <FantasyBooks />
    </div>
  );
};
