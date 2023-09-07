import express from "express";
import loadPageBooks from "./routers/loadingPageBooks.router";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import seedRouter from "./routers/seedRouter";
import userRouter from "./routers/userRouter";
import { dbConnect } from "./configs/database.configs";
import bookRouter from "./routers/bookRouter";

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
app.use("/api", seedRouter);
app.use("/api", userRouter);
app.use("/api", bookRouter);

app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
