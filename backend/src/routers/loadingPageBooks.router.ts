import axios from "axios";
import Bottleneck from "bottleneck";
import { load } from "cheerio";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { Book } from "../types/Book";

const router = Router();

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 2000,
});

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const url = "https://www.goodreads.com/genres/new_releases/fiction";
    const book: Book[] = [];
    try {
      const response = await limiter.schedule(() => axios.get(url));
      const html = response.data;
      const $ = load(html);

      $("div.leftAlignedImage.bookBox").each((index, element) => {
        const titleElement = $(element);
        const altAttribute = titleElement.find("img.bookImage").attr("alt");
        const name: string =
          altAttribute!.split("(")[0].trim() || "Default Value"; //intellisense says value could be undefined
        const scriptData = titleElement
          .find("script:not([type='text/javascript'])")
          .html();
        const authorName = extractAuthorNameFromScript(scriptData);
        const bookDescription = extractDescriptionFromScript(scriptData);
        const bookRating = extractRatingFromScript(scriptData);
        const image = titleElement.find("img.bookImage").attr("src");
        const slugName = name!
          .toLowerCase()
          .replace(/[^\w\s-'’]/g, "")
          .replace(/\s+/g, "+");
        const slugAuthor = authorName!
          .toLowerCase()
          .replace(/[^\w\s-'’.]/g, "")
          .replace(/\s+/g, "+");
        book.push({
          name,
          author: authorName || "",
          description: bookDescription || "",
          image,
          slugName,
          slugAuthor,
          rating: bookRating || 0,
          yourRating: 0,
          favorite: false,
          isbn: "",
          bookId: "",
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

function extractAuthorNameFromScript(scriptData: string | null) {
  const authorNameIndex = scriptData!.indexOf('class=\\"authorName\\"');
  if (scriptData !== null && authorNameIndex > 0) {
    const remainingScript = scriptData!.substring(authorNameIndex);
    const match = remainingScript.match(/>(.*?)</);
    return match![1];
  } else {
    return null;
  }
}

function extractDescriptionFromScript(scriptData: string | null) {
  const descriptionIndex = scriptData!.match(
    /<span id=\\"freeText\d+\\"([\s\S]*?)span>/
  );
  if (descriptionIndex) {
    const match = descriptionIndex![1];
    const text = match.match(/>([^<]*)</)![1].trim();
    const cleanedText = text.replace(/\\n+/g, "<br />").replace(/\\/g, "");

    return cleanedText;
  }
}

function extractRatingFromScript(scriptData: string | null) {
  const descriptionIndex = scriptData!.match(/span> ([\s\S]*?) avg rating/);
  if (descriptionIndex) {
    const match = descriptionIndex![1];
    return Number(match!);
  }
}

router.get(
  "/fiction",
  asyncHandler(async (req, res) => {
    const url = "https://www.goodreads.com/genres/new_releases/fiction";
    const book: Book[] = [];
    try {
      const response = await limiter.schedule(() => axios.get(url));
      const html = response.data;
      const $ = load(html);

      $("div.leftAlignedImage.bookBox").each((index, element) => {
        const titleElement = $(element);
        const altAttribute = titleElement.find("img.bookImage").attr("alt");
        const name: string =
          altAttribute!.split("(")[0].trim() || "Default Value"; //intellisense says value could be undefined
        const scriptData = titleElement
          .find("script:not([type='text/javascript'])")
          .html();
        const authorName = extractAuthorNameFromScript(scriptData);
        const bookDescription = extractDescriptionFromScript(scriptData);
        const bookRating = extractRatingFromScript(scriptData);
        const image = titleElement.find("img.bookImage").attr("src");
        const slugName = name!
          .toLowerCase()
          .replace(/[^\w\s-'’]/g, "")
          .replace(/\s+/g, "+");
        const slugAuthor = authorName!
          .toLowerCase()
          .replace(/[^\w\s-'’.]/g, "")
          .replace(/\s+/g, "+");
        book.push({
          name,
          author: authorName || "",
          description: bookDescription || "",
          image,
          slugName,
          slugAuthor,
          rating: bookRating || 0,
          yourRating: 0,
          favorite: false,
          isbn: "",
          bookId: "",
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
  "/science&tech",
  asyncHandler(async (req, res) => {
    const url = "https://www.goodreads.com/genres/new_releases/science";
    const book: Book[] = [];
    try {
      const response = await limiter.schedule(() => axios.get(url));
      const html = response.data;
      const $ = load(html);

      $("div.leftAlignedImage.bookBox").each((index, element) => {
        const titleElement = $(element);
        const altAttribute = titleElement.find("img.bookImage").attr("alt");
        const name: string =
          altAttribute!.split("(")[0].trim() || "Default Value"; //intellisense says value could be undefined
        const scriptData = titleElement
          .find("script:not([type='text/javascript'])")
          .html();
        const authorName = extractAuthorNameFromScript(scriptData);
        const bookDescription = extractDescriptionFromScript(scriptData);
        const bookRating = extractRatingFromScript(scriptData);
        const image = titleElement.find("img.bookImage").attr("src");
        const slugName = name!
          .toLowerCase()
          .replace(/[^\w\s-'’]/g, "")
          .replace(/\s+/g, "+");
        const slugAuthor = authorName!
          .toLowerCase()
          .replace(/[^\w\s-'’.]/g, "")
          .replace(/\s+/g, "+");
        book.push({
          name,
          author: authorName || "",
          description: bookDescription || "",
          image,
          slugName,
          slugAuthor,
          rating: bookRating || 0,
          yourRating: 0,
          favorite: false,
          isbn: "",
          bookId: "",
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
  "/teens&ya",
  asyncHandler(async (req, res) => {
    const url = "https://www.goodreads.com/genres/new_releases/young-adult";
    const book: Book[] = [];
    try {
      const response = await limiter.schedule(() => axios.get(url));
      const html = response.data;
      const $ = load(html);

      $("div.leftAlignedImage.bookBox").each((index, element) => {
        const titleElement = $(element);
        const altAttribute = titleElement.find("img.bookImage").attr("alt");
        const name: string =
          altAttribute!.split("(")[0].trim() || "Default Value"; //intellisense says value could be undefined
        const scriptData = titleElement
          .find("script:not([type='text/javascript'])")
          .html();
        const authorName = extractAuthorNameFromScript(scriptData);
        const bookDescription = extractDescriptionFromScript(scriptData);
        const bookRating = extractRatingFromScript(scriptData);
        const image = titleElement.find("img.bookImage").attr("src");
        const slugName = name!
          .toLowerCase()
          .replace(/[^\w\s-'’]/g, "")
          .replace(/\s+/g, "+");
        const slugAuthor = authorName!
          .toLowerCase()
          .replace(/[^\w\s-'’.]/g, "")
          .replace(/\s+/g, "+");
        book.push({
          name,
          author: authorName || "",
          description: bookDescription || "",
          image,
          slugName,
          slugAuthor,
          rating: bookRating || 0,
          yourRating: 0,
          favorite: false,
          isbn: "",
          bookId: "",
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
  "/scifi",
  asyncHandler(async (req, res) => {
    const url = "https://www.goodreads.com/genres/new_releases/science-fiction";
    const book: Book[] = [];
    try {
      const response = await limiter.schedule(() => axios.get(url));
      const html = response.data;
      const $ = load(html);

      $("div.leftAlignedImage.bookBox").each((index, element) => {
        const titleElement = $(element);
        const altAttribute = titleElement.find("img.bookImage").attr("alt");
        const name: string =
          altAttribute!.split("(")[0].trim() || "Default Value"; //intellisense says value could be undefined
        const scriptData = titleElement
          .find("script:not([type='text/javascript'])")
          .html();
        const authorName = extractAuthorNameFromScript(scriptData);
        const bookDescription = extractDescriptionFromScript(scriptData);
        const bookRating = extractRatingFromScript(scriptData);
        const image = titleElement.find("img.bookImage").attr("src");
        const slugName = name!
          .toLowerCase()
          .replace(/[^\w\s-'’]/g, "")
          .replace(/\s+/g, "+");
        const slugAuthor = authorName!
          .toLowerCase()
          .replace(/[^\w\s-'’.]/g, "")
          .replace(/\s+/g, "+");
        book.push({
          name,
          author: authorName || "",
          description: bookDescription || "",
          image,
          slugName,
          slugAuthor,
          rating: bookRating || 0,
          yourRating: 0,
          favorite: false,
          isbn: "",
          bookId: "",
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
  "/fantasy",
  asyncHandler(async (req, res) => {
    const url = "https://www.goodreads.com/genres/new_releases/fantasy";
    const book: Book[] = [];
    try {
      const response = await limiter.schedule(() => axios.get(url));
      const html = response.data;
      const $ = load(html);

      $("div.leftAlignedImage.bookBox").each((index, element) => {
        const titleElement = $(element);
        const altAttribute = titleElement.find("img.bookImage").attr("alt");
        const name: string =
          altAttribute!.split("(")[0].trim() || "Default Value"; //intellisense says value could be undefined
        const scriptData = titleElement
          .find("script:not([type='text/javascript'])")
          .html();
        const authorName = extractAuthorNameFromScript(scriptData);
        const bookDescription = extractDescriptionFromScript(scriptData);
        const bookRating = extractRatingFromScript(scriptData);
        const image = titleElement.find("img.bookImage").attr("src");
        const slugName = name!
          .toLowerCase()
          .replace(/[^\w\s-'’]/g, "")
          .replace(/\s+/g, "+");
        const slugAuthor = authorName!
          .toLowerCase()
          .replace(/[^\w\s-'’.]/g, "")
          .replace(/\s+/g, "+");
        book.push({
          name,
          author: authorName || "",
          description: bookDescription || "",
          image,
          slugName,
          slugAuthor,
          rating: bookRating || 0,
          yourRating: 0,
          favorite: false,
          isbn: "",
          bookId: "",
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
  "/horror",
  asyncHandler(async (req, res) => {
    const url = "https://www.goodreads.com/genres/new_releases/horror";
    const book: Book[] = [];
    try {
      const response = await limiter.schedule(() => axios.get(url));
      const html = response.data;
      const $ = load(html);

      $("div.leftAlignedImage.bookBox").each((index, element) => {
        const titleElement = $(element);
        const altAttribute = titleElement.find("img.bookImage").attr("alt");
        const name: string =
          altAttribute!.split("(")[0].trim() || "Default Value"; //intellisense says value could be undefined
        const scriptData = titleElement
          .find("script:not([type='text/javascript'])")
          .html();
        const authorName = extractAuthorNameFromScript(scriptData);
        const bookDescription = extractDescriptionFromScript(scriptData);
        const bookRating = extractRatingFromScript(scriptData);
        const image = titleElement.find("img.bookImage").attr("src");
        const slugName = name!
          .toLowerCase()
          .replace(/[^\w\s-'’]/g, "")
          .replace(/\s+/g, "+");
        const slugAuthor = authorName!
          .toLowerCase()
          .replace(/[^\w\s-'’.]/g, "")
          .replace(/\s+/g, "+");
        book.push({
          name,
          author: authorName || "",
          description: bookDescription || "",
          image,
          slugName,
          slugAuthor,
          rating: bookRating || 0,
          yourRating: 0,
          favorite: false,
          isbn: "",
          bookId: "",
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
  "/thriller",
  asyncHandler(async (req, res) => {
    const url = "https://www.goodreads.com/genres/new_releases/thriller";
    const book: Book[] = [];
    try {
      const response = await limiter.schedule(() => axios.get(url));
      const html = response.data;
      const $ = load(html);

      $("div.leftAlignedImage.bookBox").each((index, element) => {
        const titleElement = $(element);
        const altAttribute = titleElement.find("img.bookImage").attr("alt");
        const name: string =
          altAttribute!.split("(")[0].trim() || "Default Value"; //intellisense says value could be undefined
        const scriptData = titleElement
          .find("script:not([type='text/javascript'])")
          .html();
        const authorName = extractAuthorNameFromScript(scriptData);
        const bookDescription = extractDescriptionFromScript(scriptData);
        const bookRating = extractRatingFromScript(scriptData);
        const image = titleElement.find("img.bookImage").attr("src");
        const slugName = name!
          .toLowerCase()
          .replace(/[^\w\s-'’]/g, "")
          .replace(/\s+/g, "+");
        const slugAuthor = authorName!
          .toLowerCase()
          .replace(/[^\w\s-'’.]/g, "")
          .replace(/\s+/g, "+");
        book.push({
          name,
          author: authorName || "",
          description: bookDescription || "",
          image,
          slugName,
          slugAuthor,
          rating: bookRating || 0,
          yourRating: 0,
          favorite: false,
          isbn: "",
          bookId: "",
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
  "/nonfiction",
  asyncHandler(async (req, res) => {
    const url = "https://www.goodreads.com/genres/new_releases/non-fiction";
    const book: Book[] = [];
    try {
      const response = await limiter.schedule(() => axios.get(url));
      const html = response.data;
      const $ = load(html);

      $("div.leftAlignedImage.bookBox").each((index, element) => {
        const titleElement = $(element);
        const altAttribute = titleElement.find("img.bookImage").attr("alt");
        const name: string =
          altAttribute!.split("(")[0].trim() || "Default Value"; //intellisense says value could be undefined
        const scriptData = titleElement
          .find("script:not([type='text/javascript'])")
          .html();
        const authorName = extractAuthorNameFromScript(scriptData);
        const bookDescription = extractDescriptionFromScript(scriptData);
        const bookRating = extractRatingFromScript(scriptData);
        const image = titleElement.find("img.bookImage").attr("src");
        const slugName = name!
          .toLowerCase()
          .replace(/[^\w\s-'’]/g, "")
          .replace(/\s+/g, "+");
        const slugAuthor = authorName!
          .toLowerCase()
          .replace(/[^\w\s-'’.]/g, "")
          .replace(/\s+/g, "+");
        book.push({
          name,
          author: authorName || "",
          description: bookDescription || "",
          image,
          slugName,
          slugAuthor,
          rating: bookRating || 0,
          yourRating: 0,
          favorite: false,
          isbn: "",
          bookId: "",
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
  "/mystery&crime",
  asyncHandler(async (req, res) => {
    const url = "https://www.goodreads.com/genres/new_releases/mystery";
    const book: Book[] = [];
    try {
      const response = await limiter.schedule(() => axios.get(url));
      const html = response.data;
      const $ = load(html);

      $("div.leftAlignedImage.bookBox").each((index, element) => {
        const titleElement = $(element);
        const altAttribute = titleElement.find("img.bookImage").attr("alt");
        const name: string =
          altAttribute!.split("(")[0].trim() || "Default Value"; //intellisense says value could be undefined
        const scriptData = titleElement
          .find("script:not([type='text/javascript'])")
          .html();
        const authorName = extractAuthorNameFromScript(scriptData);
        const bookDescription = extractDescriptionFromScript(scriptData);
        const bookRating = extractRatingFromScript(scriptData);
        const image = titleElement.find("img.bookImage").attr("src");
        const slugName = name!
          .toLowerCase()
          .replace(/[^\w\s-'’]/g, "")
          .replace(/\s+/g, "+");
        const slugAuthor = authorName!
          .toLowerCase()
          .replace(/[^\w\s-'’.]/g, "")
          .replace(/\s+/g, "+");
        book.push({
          name,
          author: authorName || "",
          description: bookDescription || "",
          image,
          slugName,
          slugAuthor,
          rating: bookRating || 0,
          yourRating: 0,
          favorite: false,
          isbn: "",
          bookId: "",
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
  "/romance",
  asyncHandler(async (req, res) => {
    const url = "https://www.goodreads.com/genres/new_releases/romance";
    const book: Book[] = [];
    try {
      const response = await limiter.schedule(() => axios.get(url));
      const html = response.data;
      const $ = load(html);

      $("div.leftAlignedImage.bookBox").each((index, element) => {
        const titleElement = $(element);
        const altAttribute = titleElement.find("img.bookImage").attr("alt");
        const name: string =
          altAttribute!.split("(")[0].trim() || "Default Value"; //intellisense says value could be undefined
        const scriptData = titleElement
          .find("script:not([type='text/javascript'])")
          .html();
        const authorName = extractAuthorNameFromScript(scriptData);
        const bookDescription = extractDescriptionFromScript(scriptData);
        const bookRating = extractRatingFromScript(scriptData);
        const image = titleElement.find("img.bookImage").attr("src");
        const slugName = name!
          .toLowerCase()
          .replace(/[^\w\s-'’]/g, "")
          .replace(/\s+/g, "+");
        const slugAuthor = authorName!
          .toLowerCase()
          .replace(/[^\w\s-'’.]/g, "")
          .replace(/\s+/g, "+");
        book.push({
          name,
          author: authorName || "",
          description: bookDescription || "",
          image,
          slugName,
          slugAuthor,
          rating: bookRating || 0,
          yourRating: 0,
          favorite: false,
          isbn: "",
          bookId: "",
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
  "/search/:slugName",
  asyncHandler(async (req, res) => {
    const { slugName } = req.params;
    const url = `https://openlibrary.org/search.json?q=${slugName}`;
    try {
      const response = await axios.get(url);
      const bookDetails = response.data.docs;

      const books: Book[] = await Promise.all(
        bookDetails.map(
          (bookData: {
            title: string;
            author_name: Array<string>;
            isbn: string;
            number_of_pages_median: number;
            cover_i: number;
          }) => {
            const book: Book = {
              name: bookData.title,
              author:
                bookData.author_name && bookData.author_name.length > 0
                  ? bookData.author_name[0]
                  : "Unknown Author",
              isbn: bookData.isbn,
              pages: bookData.number_of_pages_median,
              slugName: bookData.title
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "+") /*bookData.title
                .trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "+"),*/,
              slugAuthor:
                bookData.author_name && bookData.author_name.length > 0
                  ? bookData.author_name[0]
                      .trim()
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, "")
                      .replace(/\s+/g, "+")
                  : "" /*bookData.author_name
                .trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "+")*/,
              rating: 0,
              yourRating: 0,
              favorite: false,
              bookId: "",
              image: undefined,
            };
            try {
              const coverUrl = `https://covers.openlibrary.org/b/id/${bookData.cover_i}-L.jpg`;

              book.image = coverUrl;
            } catch (error) {
              console.log("No image found");
            }
            return book;
          }
        )
      );

      res.json(books);
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);
export default router;
