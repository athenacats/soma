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
        const slugName = name
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "+");
        const slugAuthor = author
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "+");
        book.push({
          name,
          author,
          image,
          slugName,
          slugAuthor,
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
  "/book/:slugName/:slugAuthor",
  asyncHandler(async (req, res) => {
    const { slugName, slugAuthor } = req.params;
    console.log(req);

    console.log("Name:", slugName);
    console.log("Author:", slugAuthor);
    const book: Book[] = [];

    res.json({ message: "Slug recorded successfully." });
    const url = `https://openlibrary.org/search.json?title=${slugName}&author=${slugAuthor}`;
    try {
      const response = await limiter.schedule(() => axios.get(url));
      const html = response.data;

      const $ = load(html);
      console.log($);

      $("div.post").each((index, element) => {
        const titleElement = $(element);
        const title = titleElement.find("div.postTitle h2").text().trim();
        let link = url + titleElement.find("a").attr("href");
        const img = titleElement.find("img").attr("src");
        const id = uuid();
        link = link.replace(/^.*?\/abss\//, "https://audiobookbay.is/abss/");
        book.push({ title, link, img, id });
      });
      res.json(audiobooks);
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);
export default router;
