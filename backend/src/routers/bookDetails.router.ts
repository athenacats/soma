//import axios from "axios";
//import { load } from "cheerio";
import { Router } from "express";
import asyncHandler from "express-async-handler";
//import { Book } from "../types/Book";

const router = Router();

router.get(
  "/slug",
  asyncHandler(async (req, res) => {
    const { slug } = req.body;
    console.log(slug);
    res.json({ message: "Slug recorded successfully." });
    /*const url = `http://audiobookbay.is/?s=${searchTerm}&cat=undefined%2Cundefined`;
    try {
      const response = await limiter.schedule(() => axios.get(url));
      const html = response.data;

      const $ = load(html);
      console.log($);
      const audiobooks: {
        title: string;
        link: string;
        img: string | undefined;
        id: string;
      }[] = [];
      $("div.post").each((index, element) => {
        const titleElement = $(element);
        const title = titleElement.find("div.postTitle h2").text().trim();
        let link = url + titleElement.find("a").attr("href");
        const img = titleElement.find("img").attr("src");
        const id = uuid();
        link = link.replace(/^.*?\/abss\//, "https://audiobookbay.is/abss/");
        audiobooks.push({ title, link, img, id });
      });
      res.json(audiobooks);
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }*/
  })
);

export default router;
