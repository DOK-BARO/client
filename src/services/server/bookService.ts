import axios from "axios";
import { BookType, GetBookListParams } from "../../types/BookType.ts";
import { BookDetailType } from "../../types/BookDetailType.ts";
import { BookCategory } from "../../types/GNBCategoryType.ts";

// 책 목록, 책 상세정보 등을 가져오는 api 호출 로직
export const getBookList = async (
  params: GetBookListParams = {}
): Promise<BookType[]> => {
  const {
    title = null,
    authorName = null,
    description = null,
    category = null,
    page = 1,
    size = 24,
  } = params || {};

  try {
    const { data } = await axios.get("/books", {
      params: {
        title,
        authorName,
        description,
        category,
        page,
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
