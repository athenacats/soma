import { Helmet } from "react-helmet-async";
import RomanceBooks from "../components/RomanceBooks";

export default function RomancePage() {
  return (
    <div className="body-container">
      <Helmet>
        <title>Romance Books</title>
      </Helmet>
      <RomanceBooks />
    </div>
  );
}
