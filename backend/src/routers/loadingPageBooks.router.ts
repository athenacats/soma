import axios from "axios";
import Bottleneck from "bottleneck";
import { load } from "cheerio";
import { Router } from "express";
import asyncHandler from "express-async-handler";

const router = Router();

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 5000,
});

router.get(
  "/api",
  asyncHandler(async (req, res) => {
    const url = "http://theaudiobookbay.cc/";
    try {
      const response = await limiter.schedule(() => axios.get(url));
      const html = response.data;

      const $ = load(html);
      console.log($);
      const audiobooks: {
        title: string;
        link: string;
        img: string | undefined;
      }[] = [];
      $("div.post").each((index, element) => {
        const titleElement = $(element);
        const title = titleElement.find("div.postTitle h2").text().trim();
        const link = url + titleElement.find("a").attr("href");
        const img = titleElement.find("img").attr("src");
        audiobooks.push({ title, link, img });
      });
      res.json(audiobooks);
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);
export default router;
