import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Book } from "../types/Book";
import { UserInfo } from "../types/userInfo";

export const useRateBookMutation = () => {
  return useMutation(
    async ({
      book,
      user,
      yourRating,
    }: {
      book: Book;
      user: UserInfo;
      yourRating: number;
    }) => {
      const response = await apiClient.post(`/api/books/rate`, {
        book,
        user,
        yourRating,
      });
      console.log(response.data);
      return response.data;
    }
  );
};

export const useGetBooksQuery = () =>
  useQuery({
    queryKey: ["books"],
    queryFn: async () => (await apiClient.get<Book[]>(`api/`)).data,
  });

export const useGetBookDetailsBySlugQuery = (
  slugName: string,
  slugAuthor: string
) =>
  useQuery({
    queryKey: ["books", slugName, slugAuthor],
    queryFn: async () =>
      (await apiClient.get<Book[]>(`api/book/${slugName}/${slugAuthor}`)).data,
  });

export const useGetBookDetailsBySearchQuery = (
  slugName: string,
  slugAuthor: string
) =>
  useQuery({
    queryKey: ["books", slugName, slugAuthor],
    queryFn: async () =>
      (await apiClient.get<Book[]>(`api/search/${slugName}/${slugAuthor}`))
        .data,
  });

export const useGetFictionBooksQuery = () =>
  useQuery({
    queryKey: ["books"],
    queryFn: async () => (await apiClient.get<Book[]>(`api/fiction`)).data,
  });

export const useGetMysteryCrimeBooksQuery = () =>
  useQuery({
    queryKey: ["books"],
    queryFn: async () =>
      (await apiClient.get<Book[]>(`api/mystery&crime`)).data,
  });

export const useGetRomanceBooksQuery = () =>
  useQuery({
    queryKey: ["books"],
    queryFn: async () => (await apiClient.get<Book[]>(`api/romance`)).data,
  });

export const useGetScienceTechBooksQuery = () =>
  useQuery({
    queryKey: ["books"],
    queryFn: async () => (await apiClient.get<Book[]>(`api/science&tech`)).data,
  });

export const useGetScifiFantasyBooksQuery = () =>
  useQuery({
    queryKey: ["books"],
    queryFn: async () =>
      (await apiClient.get<Book[]>(`api/scifi&fantasy`)).data,
  });

export const useGetTeensYABooksQuery = () =>
  useQuery({
    queryKey: ["books"],
    queryFn: async () => (await apiClient.get<Book[]>(`api/teens&ya`)).data,
  });

export const useGetDefaultBooks = () =>
  useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await apiClient.get<Book[]>(`api/seedbooks`);
      console.log(response.data);
      return response.data || [];
    },
  });
