import { BookType, BookQuizzesType } from "../../types/BookType.ts";
import { BookDetailType } from "../../types/BookDetailType.ts";
import { BookCategory } from "../../types/GNBCategoryType.ts";
import { axiosInstance } from "@/config/axiosConfig.ts";
import { handleAxiosError } from "@/utils/errorHandler.ts";
import {
  FetchBooksParams,
  FetchQuizzesParams,
  SearchBooksParams,
} from "@/types/ParamsType.ts";

// 책 목록, 책 상세정보 가져오기
class BookService {
  fetchBooks = async (
    params: FetchBooksParams = {}
  ): Promise<{ data: BookType[]; endPageNumber: number } | void> => {
    const {
      title,
      authorName,
      description,
      category,
      page = 1,
      size,
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
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  };
  // 책 통합검색
  fetchSearchBooks = async (
    params?: SearchBooksParams
  ): Promise<BookType[]> => {
    const { keyword, lastId = null, size = 20 } = params || {};

    try {
      const { data } = await axiosInstance.get("/books/integrated", {
        params: {
          keyword,
          lastId,
          size,
        },
      });
      return data;
    } catch (error) {
      throw new Error(`책 통합검색 실패: ${error}`);
    }
  };

  fetchBook = async (bookId: string): Promise<BookDetailType> => {
    try {
      const { data } = await axiosInstance.get(`/books/${bookId}`);
      return data;
    } catch (error) {
      throw new Error(`책 상세 가져오기 실패: ${error}`);
    }
  };

  fetchBookCategories = async (): Promise<BookCategory[] | void> => {
    try {
      const { data } = await axiosInstance.get("/book-categories");
      return data.details[0].details;
    } catch (error) {
      handleAxiosError(error);
    }
  };

  fetchBookQuizzes = async (
    params: FetchQuizzesParams
  ): Promise<BookQuizzesType> => {
    try {
      const { page, size, sort, direction, bookId} = params;
      const { data } = await axiosInstance.get(
        `/book-quizzes?page=${page}&size=${size}&sort=${sort}&direction=${direction}&bookId=${bookId}`
      );
      return data;
    } catch (error) {
      throw new Error(`책 상세 퀴즈 리스트 조회 실패: ${error}`);
    }
  };
}
export const bookService = new BookService();
