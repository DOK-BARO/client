import axios from "axios";
import { BookType } from "../types/BookType";
import { BookDetailType } from "../types/BookDetailType.ts";

// 책 목록, 책 상세정보 등을 가져오는 api 호출 로직
export const getBookList = async (): Promise<BookType[]> => {
  try {
    const { data } = await axios.get("/books", {
      params: {
        size: 24,
      },
    });
    //console.log("%o",data);
    return data;
  } catch (error) {
    throw new Error(`책 목록 가져오기 실패: ${error}`);
  }
};

export const getBook = async (bookId:string): Promise<BookDetailType> => {
  try {
    const { data } = await axios.get(`/books/${bookId}`);
    return data;
  } catch (error) {
    throw new Error(`책 상세 가져오기 실패: ${error}`);
  }
};

export const getBookCategories = async () => {
  try {
    const { data } = await axios.get("/book-categories");
    return data;
  } catch (error) {
    console.error(error);
  }
};
