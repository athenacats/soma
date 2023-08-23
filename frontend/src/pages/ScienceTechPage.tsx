import { Helmet } from "react-helmet-async";
import ScienceTechBooks from "../components/ScienceTechBooks";

export default function ScienceTechPage() {
  return (
    <div className="body-container">
      <Helmet>
        <title>Science and Technology Books</title>
      </Helmet>
      <ScienceTechBooks />
    </div>
  );
}
