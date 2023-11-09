import { Helmet } from "react-helmet-async";

import HorrorBooks from "../components/HorrorBooks";

export const HorrorPage = () => {
  return (
    <div className="body-container">
      <Helmet>
        <title>Horror Books</title>
      </Helmet>
      <HorrorBooks />
    </div>
  );
};
