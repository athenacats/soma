import express from "express";
import loadPageBooks from "./routers/loadingPageBooks.router";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./configs/database.configs";

dotenv.config();

dbConnect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.use("/api", loadPageBooks);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
