import { Helmet } from "react-helmet-async";
import TeensYABooks from "../components/TeensYABooks";

export default function TeensYAPage() {
  return (
    <div className="body-container">
      <Helmet>
        <title>Teens & YA Books</title>
      </Helmet>
      <TeensYABooks />
    </div>
  );
}
