import express from "express";
import loadPageBooks from "./routers/loadingPageBooks.router";
import cors from "cors";
import bookDetails from "./routers/bookDetails.router";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.use("/api", loadPageBooks);
app.use("/api/book", bookDetails);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
