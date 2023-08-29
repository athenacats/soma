export type Book = {
  name: string;
  image: string | undefined;
  author: string;
  rating: number;
  favorite: boolean;
  isbn?: string;
  yourRating: number;
  pages?: number;
  description?: string;
  slugName: string;
  slugAuthor: string;
};
