import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Book } from "../types/Book";

export const useGetBooksQuery = () =>
  useQuery({
    queryKey: ["books"],
    queryFn: async () => (await apiClient.get<Book[]>(`api/`)).data,
  });

export const useGetBookDetailsBySlugQuery = (
  slug: string,
  name: string,
  author: string
) =>
  useQuery({
    queryKey: ["books", slug],
    queryFn: async () =>
      (
        await apiClient.get<Book>(
          `api/book/${slug}?name=${encodeURIComponent(
            name
          )}&author=${encodeURIComponent(author)}`
        )
      ).data,
  });
