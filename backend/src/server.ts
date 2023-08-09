import express, { Request, Response } from "express";

const app = express();

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
