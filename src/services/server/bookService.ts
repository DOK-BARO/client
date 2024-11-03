import axios from "axios";
import { BookType, GetBookListParams } from "../../types/BookType.ts";
import { BookDetailType } from "../../types/BookDetailType.ts";
import { BookCategory } from "../../types/GNBCategoryType.ts";

// 책 통합검색
export const getBookList = async (
  params?: GetBookListParams
): Promise<BookType[]> => {
  const { keyword, lastId = null, size = 10 } = params || {};

  try {
    const { data } = await axios.get("/books/integrated", {
      params: {
        keyword,
        lastId,
        size,
      },
    });
    return data;
  } catch (error) {
    throw new Error(`책 목록 가져오기 실패: ${error}`);
  }
};

export const getBook = async (bookId: string): Promise<BookDetailType> => {
  try {
    const { data } = await axios.get(`/books/${bookId}`);
    return data;
  } catch (error) {
    throw new Error(`책 상세 가져오기 실패: ${error}`);
  }
};

export const getBookCategories = async (): Promise<BookCategory[]> => {
  try {
    const { data } = await axios.get("/book-categories");
    return data.details[0].details;
  } catch (error) {
    throw new Error(`책 카테고리 가져오기 실패: ${error}`);
  }
};
