import dotenv from "dotenv";
dotenv.config();
import express from "express";
// import cookieParser from "cookie-parser";
import loadPageBooks from "./routers/loadingPageBooks.router";
import cors from "cors";
import path from "path";
import seedRouter from "./routers/seedRouter";
import userRouter from "./routers/userRouter";
import { dbConnect } from "./configs/database.configs";
import bookRouter from "./routers/bookRouter";

dbConnect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //needed so that you can parse data from the body

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
//app.use(cookieParser());

/*app.get("/set-cookie", (req, res) => {
  res.cookie("myCookie", "myValue", {
    sameSite: "strict",
    secure: true,
    maxAge: 3600000,
  });
  res.send("Cookie set");
});*/

app.use("/api", loadPageBooks);
app.use("/api", seedRouter);
app.use("/api", userRouter);
app.use("/api", bookRouter);

app.use(express.static(path.join(__dirname, "../../frontend/dist"))); // need this exact code to connect to frontend index.html
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
