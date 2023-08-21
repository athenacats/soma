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

    res.json({ message: "Slug recorded successfully." });
    const url = `https://openlibrary.org/search.json?title=${slugName}&author=${slugAuthor}`;
    try {
      const response = await axios.get(url);
      const bookDetails = response.data.docs;

      const books: Book[] = bookDetails.map(
        (bookData: {
          title: string;
          author_name: string;
          isbn: string;
          number_of_pages_median: number;
        }) => {
          const book: Book = {
            name: bookData.title,
            author: bookData.author_name[0],
            isbn: bookData.isbn[0],
            pages: bookData.number_of_pages_median,
            slugName: slugName,
            slugAuthor: slugAuthor,
            rating: 0,
            yourRating: 0,
            favorite: false,
            price: 0,
            image: `https://covers.openlibrary.org/b/isbn/${isbn}-S.jpg`,
          };
          return book;
        }
      );

      res.json(books);
      console.log(url);
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);
export default router;
