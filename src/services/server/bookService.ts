import {
  BookType,
  GetBooksParams,
  SearchBooksParams,
} from "../../types/BookType.ts";
import { BookDetailType } from "../../types/BookDetailType.ts";
import { BookCategory } from "../../types/GNBCategoryType.ts";
import axios, { AxiosError } from "axios";
import localApi from "../local/LocalApi.ts";
import { axiosInstance } from "@/config/axiosConfig.ts";

// 책 목록, 책 상세정보 가져오기
class BookService {
  getBooks = async (
    params: GetBooksParams = {}
  ): Promise<{ data: BookType[]; endPageNumber: number }> => {
    const {
      title = undefined,
      authorName = undefined,
      description = undefined,
      category = undefined,
      page = 1,
      size = undefined,
      sort = "QUIZ_COUNT",
      direction = "ASC",
    } = params || {};

    try {
      const response = await axiosInstance.get("/books", {
        params: {
          title,
          authorName,
          description,
          category,
          page,
          size,
          sort,
          direction,
        },
      });
      console.log("책 목록!!", response);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 403) {
          localApi.removeCertification();
          throw error;
        }
      }
      throw new Error(`책 목록 가져오기 실패: ${error}`);
    }
  };
  // 책 통합검색
  searchBooks = async (params?: SearchBooksParams): Promise<BookType[]> => {
    const { keyword, lastId = null, size = 10 } = params || {};

    try {
      const { data } = await axiosInstance.get("/books/integrated", {
        params: {
          keyword,
          lastId,
          size,
        },
      });
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 403) {
          localApi.removeCertification();
          throw error;
        }
      }
      throw new Error(`책 통합검색 실패: ${error}`);
    }
  };

  getBook = async (bookId: string): Promise<BookDetailType> => {
    try {
      const { data } = await axiosInstance.get(`/books/${bookId}`);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 403) {
          localApi.removeCertification();
          throw error;
        }
      }
      throw new Error(`책 상세 가져오기 실패: ${error}`);
    }
  };

  getBookCategories = async (): Promise<BookCategory[]> => {
    try {
      const { data } = await axiosInstance.get("/book-categories");
      return data.details[0].details;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 403) {
          console.log("Sdfsdf");
          localApi.removeCertification();
          throw error;
        }
      }
      throw new Error(`책 카테고리 가져오기 실패: ${error}`);
    }
  };
}
export const bookService = new BookService();
