import { Helmet } from "react-helmet-async";
import ScifiFantasyBooks from "../components/ScifiFantasyBooks";

export default function ScifiFantasyPage() {
  return (
    <div className="body-container">
      <Helmet>
        <title>Science Fiction & Fantasy Books</title>
      </Helmet>
      <ScifiFantasyBooks />
    </div>
  );
}
