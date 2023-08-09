import express from "express";
import loadPageBooks from "./routers/loadingPageBooks.router";

const app = express();

app.use("/api", loadPageBooks);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
