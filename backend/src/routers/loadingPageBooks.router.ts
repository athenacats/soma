import axios from "axios";
import Bottleneck from "bottleneck";
import { load } from "cheerio";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { Book } from "../types/Book";

const router = Router();

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 5000,
});

router.get(
  "/",
  asyncHandler(async (req, res) => {
    console.log("test");
    const url = "https://www.barnesandnoble.com/b/books/_/N-1pZ29Z8q8";
    const book: Book[] = [];
    try {
      const response = await limiter.schedule(() => axios.get(url));
      const html = response.data;
      const $ = load(html);
      console.log("seeme", $);

      $(
        "div.product-shelf-tile.product-shelf-tile-book.bnBadgeHere.columns-4"
      ).each((index, element) => {
        const titleElement = $(element);
        const name = titleElement
          .find("div.product-shelf-title.product-info-title.pt-xs ")
          .text()
          .trim();
        const author = titleElement
          .find("div.product-shelf-author.pt-0.mt-1 a")
          .text()
          .trim();
        const image = titleElement.find("img.full-shadow").attr("src");
        const slug = name.replace(/\s+/g, "-");
        book.push({
          name,
          author,
          image,
          slug,
          rating: 0,
          yourRating: 0,
          favorite: false,
          isbn: 0,
          price: 0,
          pages: 0,
        });
      });
      res.json(book);
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.get(
  "/book/:slug",
  asyncHandler(async (req, res) => {
    const { slug } = req.params;
    console.log(slug);
    res.json({ message: "Slug recorded successfully." });
  })
);
export default router;
