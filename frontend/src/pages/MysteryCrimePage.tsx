import { Helmet } from "react-helmet-async";
import MysteryCrimeBooks from "../components/MysteryCrimeBooks";

export default function MysteryCrimePage() {
  return (
    <div className="body-container">
      <Helmet>
        <title>Mystery & Crime Books</title>
      </Helmet>
      <MysteryCrimeBooks />
    </div>
  );
}
