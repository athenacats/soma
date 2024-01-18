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
      return response.data;
    }
  );
};

export const useGetBooksQuery = (page: number) =>
  useQuery({
    queryKey: ["books", page],
    queryFn: async () =>
      (await apiClient.get<Book[]>(`api/`, { params: { page } })).data,
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

export const useGetBookDetailsBySearchQuery = (slugName: string) =>
  useQuery({
    queryKey: ["books", slugName],
    queryFn: async () =>
      (await apiClient.get<Book[]>(`api/search/${slugName}`)).data,
  });

export const useGetFictionBooksQuery = (page: number) =>
  useQuery({
    queryKey: ["books", page],
    queryFn: async () =>
      (await apiClient.get<Book[]>(`api/fiction`, { params: { page } })).data,
  });

export const useGetMysteryCrimeBooksQuery = (page: number) =>
  useQuery({
    queryKey: ["books", page],
    queryFn: async () =>
      (await apiClient.get<Book[]>(`api/mystery&crime`, { params: { page } }))
        .data,
  });

export const useGetRomanceBooksQuery = (page: number) =>
  useQuery({
    queryKey: ["books", page],
    queryFn: async () =>
      (await apiClient.get<Book[]>(`api/romance`, { params: { page } })).data,
  });

export const useGetScienceTechBooksQuery = (page: number) =>
  useQuery({
    queryKey: ["books", page],
    queryFn: async () =>
      (await apiClient.get<Book[]>(`api/science&tech`, { params: { page } }))
        .data,
  });

export const useGetScifiBooksQuery = (page: number) =>
  useQuery({
    queryKey: ["books", page],
    queryFn: async () =>
      (await apiClient.get<Book[]>(`api/scifi`, { params: { page } })).data,
  });

export const useGetFantasyBooksQuery = (page: number) =>
  useQuery({
    queryKey: ["books", page],
    queryFn: async () =>
      (await apiClient.get<Book[]>(`api/fantasy`, { params: { page } })).data,
  });

export const useGetHorrorBooksQuery = (page: number) =>
  useQuery({
    queryKey: ["books", page],
    queryFn: async () =>
      (await apiClient.get<Book[]>(`api/horror`, { params: { page } })).data,
  });

export const useGetNonfictionBooksQuery = (page: number) =>
  useQuery({
    queryKey: ["books", page],
    queryFn: async () =>
      (await apiClient.get<Book[]>(`api/nonfiction`, { params: { page } }))
        .data,
  });

export const useGetThrillerBooksQuery = (page: number) =>
  useQuery({
    queryKey: ["books", page],
    queryFn: async () =>
      (await apiClient.get<Book[]>(`api/thriller`, { params: { page } })).data,
  });

export const useGetTeensYABooksQuery = (page: number) =>
  useQuery({
    queryKey: ["books", page],
    queryFn: async () =>
      (await apiClient.get<Book[]>(`api/teens&ya`, { params: { page } })).data,
  });

export const useGetUserRatedBooks = (userId: string) =>
  useQuery({
    queryKey: ["books", userId],
    queryFn: async () => {
      const response = await apiClient.get(`/api/profile/${userId}`);
      return response.data || [];
    },
  });

export const useGetDefaultBooks = () =>
  useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await apiClient.get<Book[]>(`api/seedbooks`);
      return response.data || [];
    },
  });
